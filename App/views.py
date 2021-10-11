from Pris.utils import render_to_pdf
from PIL import Image
from django.shortcuts import render, redirect
from django.core.mail import send_mail, EmailMessage, send_mass_mail
from django.contrib.auth import login, logout, authenticate, get_user_model
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import Pupil, MyClass, Calendar, Asset, Journal, ChartOfAccounts, Employee, Teacher, Subject, GradeLevel, Exam, AcademicProgress, Recommendation, TuitionFee, ExamQuestion, Contact, Task, GuardianParticulars, MedicalRecords, PreviousSchool, Allergy, ExamGroupMain,ExamGroup, Hierarchy, JournalExtras, StoreRecord, StoreItem
from django.contrib import messages
from django.http import HttpResponse
import datetime, time
import string
import random
import docx
import json
from .forms import PhotoForm, ExamForm,H, ChartOfAccountsForm
from .myfunctions import admission_number_func, password_func, percent, myemail, doc_no_func
from django.db.models import Sum, Avg, Q
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError


User = get_user_model()
# check whether is a superuser


def home(request):
    return render(request, 'pris/home.html')

def is_superuser(user):
    return user.is_superuser


def is_not_superuser(user):
    if user.is_superuser == False:
        return user


def handler404(request, exception, template_name="pris/404.html"):
    response = render_to_response(template_name)
    response.status_code = 404
    return response


@user_passes_test(is_superuser)
def assets(request):
    h = Hierarchy.objects.all()
    if request.POST:
        if 'name' in request.POST:
            form = H(request.POST)
            if form.is_valid():
                form.save()
    # elif request.GET:
    #     for i in request.GET:
    #         if request.GET.get('z'):
    form = H()
    return render(request, "pris/new.html", {'h':h,'form':form})





@login_required
def calendar(request):
    event_arr = []
    # if filters prislied then get parameter and filter based on condition else return object
    if request.POST:
        ename = request.POST['ename']
        edatestart = request.POST['edatestart']
        edateend = request.POST['edateend']
        edesc = request.POST['edesc']
        ecolor = request.POST['ecolor']
        eicon = request.POST['eicon']
        edatestart = datetime.datetime.strptime(
            edatestart, '%d %B %Y %I:%M %p')
        edateend = datetime.datetime.strptime(edateend, '%d %B %Y %I:%M %p')
        Calendar.objects.create(name=ename, description=edesc,
                                start_date=edatestart, end_date=edateend, color=ecolor, icon=eicon)

    # if request.GET.get('event_type') == "all":
    all_events = Calendar.objects.all()
    # else:
    #     all_events = Calendar.objects.filter(event_type__icontains=request.GET.get('event_type'))

    # for i in all_events:
    #     event_sub_arr = {}
    #     event_sub_arr['title'] = i.name
    #     start_date = datetime.datetime.strptime(str(i.start_date.date()), "%Y-%m-%d").strftime("%Y-%m-%d")
    #     end_date = datetime.datetime.strptime(str(i.end_date.date()), "%Y-%m-%d").strftime("%Y-%m-%d")
    #     event_sub_arr['start'] = start_date
    #     event_sub_arr['end'] = end_date
    #     event_arr.append(event_sub_arr)

    category = ['title']

    context = {
        "events": all_events,

    }
    return render(request, "pris/calendar.html", context)


@user_passes_test(is_superuser)
def cash_book(request):
    end_date = datetime.date.today()
    start_date = end_date - datetime.timedelta(days=10)

    if request.method == 'POST':
        date_range = request.POST['date'].split(' - ')
        start_date = datetime.datetime.strptime(
            date_range[0], '%m/%d/%Y')
        end_date = datetime.datetime.strptime(date_range[1], '%m/%d/%Y')
    try:
        acc = ChartOfAccounts.objects.get(name__iexact='banks')
        cashbook = Journal.objects.filter(Q(doc_no__startswith='PV') | Q(doc_no__startswith='REC'), date__range=[start_date, end_date])
        for i in acc.children.all():
            dr_sum = Journal.objects.filter(Q(date__range=[start_date, end_date]) & Q(acc_no=i)).aggregate(Sum('amount'))['amount__sum']
            cr_sum = Journal.objects.filter(Q(date__range=[start_date, end_date]) & Q(bal_acc_no=i)).aggregate(Sum('amount'))['amount__sum']

        context_1 = {'cashbook': cashbook,  'dr_sum': dr_sum,
                     'cr_sum': cr_sum, 'acc': acc}
    except:
        messages.warning(request, 'Cash is not in chart of accounts', extra_tags='cash-error')
        return redirect('setup')

    context_2 = {'start_date': start_date, 'end_date': end_date}
    try:
        context = {**context_1, **context_2}
    except:
        context = context_2
    return render(request, "pris/cash-book.html", context)


@login_required
def change_password(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        try:
            s_user = User.objects.get(username=username)
            s_user.set_password(password)
            s_user.save()
            messages.success(request,'Password changed!')
        except:
            messages.error(request,'Incorrect username')

    return render(request, 'pris/change-password.html')


@user_passes_test(is_superuser)
def chart_of_accs(request):
    chartofaccs = ChartOfAccounts.objects.all().order_by('start')
    chart_list = []
    # for coa_total in ChartOfAccounts.objects.all():
    #     each_chart_list = []
    #     for acc in coa_total.chartOfaccounts_set.all():
    #         amount = CashBook.objects.filter(journal_entry__cr_ledger=acc).aggregate(
    #             Sum('journal_entry'amount'))['journal_entry'amount__sum']
    #         each_chart_list.append([acc, amount])
    #     amount_coa_total = CashBook.objects.filter(journal_entry__cr_ledger__total=coa_total).aggregate(
    #         Sum('journal_entry'amount'))['journal_entry'amount__sum']
    #     chart_list.append([coa_total, amount_coa_total, each_chart_list])

    # for i in chartofaccs:
    #     amount = CashBook.objects.filter(journal_entry__cr_ledger=i).aggregate(
    #         Sum('journal_entry'amount'))['journal_entry'amount__sum']
    #     chart_list.append({i:amount})
    if request.POST:
        form = ChartOfAccountsForm(request.POST)
        if form.is_valid():
            try:
                form.save()
            except:
                messages.error(request,'out of range')
    else:
        form = ChartOfAccountsForm()
    chartofaccs = ChartOfAccounts.objects.all()
    context = {'chartofaccs': chartofaccs,'form':form}

    return render(request, "pris/chartofaccs.html", context)


@login_required
def journal(request, journal_type):
    if request.method == 'POST':
        if 'amount' in request.POST:
            date = datetime.datetime.strptime(request.POST['date'], '%d %B %Y')
            doc_no = request.POST.get('doc-no')
            cheque_no = request.POST.get('cheque-no',None)

            description = request.POST.get('description')

            # if journal_type == 'transport-fees':
            #     des = description.split(' - ')
            #     description = f'from - {des[0]} - to - {des[1]}'
            if journal_type == 'receipts':
                doc_type = 'receipts'

            acc_type = request.POST['acc-type']
            acc_no = request.POST['acc-no']
            bal_acc_type = request.POST['bal-acc-type']
            bal_acc_no = request.POST['bal-acc-no']
            amount = request.POST['amount']
            acc_no = ChartOfAccounts.objects.get(start=acc_no)
            bal_acc_no = ChartOfAccounts.objects.get(start=bal_acc_no)
            journal = Journal.objects.create(doc_type=doc_type, doc_no=doc_no, date=date, description=description, acc_type=acc_type, acc_no=acc_no, bal_acc_type=bal_acc_type, bal_acc_no=bal_acc_no, amount=amount)

            if cheque_no:
                JournalExtras.objects.create(journal=journal, cheque_no=cheque_no,)

        # elif 'delete' in request.POST:
        #     try:
        #         pk = request.POST['delete']
        #         Journal.objects.get(pk=pk).delete()
        #     except:
        #         pass

        # elif 'edit' in request.POST:
        #     pk = request.POST['edit']
        #     date = datetime.datetime.strptime(
        #         request.POST['date'], '%B %d, %Y')
        #     pupil_user = User.objects.get(username=request.POST['pupil'])
        #     SchoolFeesCashBook.objects.filter(pk=pk).update(
        #         date=date, pupil=pupil_user, amount=request.POST['amount'],)

        elif 'amount' not in request.POST:
            for i in request.POST:
                if 'post' in i:
                    pk = i.replace('post', '')
                    journal = Journal.objects.get(pk=pk)
                    # acc = ChartOfAccounts.objects.get(name='Cash')
                    # # if journal.dr_ledger == acc:
                    # c = CashBook.objects.create(
                    #     journal_entry=journal,  ledger=journal.cr_ledger,)
                    # # else:
                    # #     c=CashBook.objects.create(
                    # #         journal_entry=journal, ledger=journal.dr_ledger)
                    # c.balance_func()
                    # c.save()
                    journal.is_posted = True
                    journal.save()

            for i in request.POST:
                if 'post' in i:
                    return redirect('index2')

    coa_total = ChartOfAccounts.objects.all()
    journal = Journal.objects.filter(is_posted=False, doc_type=journal_type)

    doc_no = doc_no_func(journal_type)
    context = {'journal': journal, 'coa_total': coa_total,
               'journal_type': journal_type, 'doc_no': doc_no}
    return render(request, "pris/journal.html", context)

@login_required
def load_doc_no(request):
    doc_type = request.GET.get('doc-type')
    return HttpResponse(doc_no_func(doc_type))

def load_acc_no(request):
    acc_type = request.GET.get('acc-type')
    input_name = request.GET.get('name')
    if acc_type == 'bank':
        coa = ChartOfAccounts.objects.filter(name__istartswith='bank')
    elif acc_type == 'customer':
        coa = ChartOfAccounts.objects.filter(name__iexact='debtors')
    else:
        coa = ChartOfAccounts.objects.all()
    context = {'var':coa, 'acc_type':acc_type, 'input_name':input_name}
    return render(request, 'pris/load-acc-no.html', context)

@login_required
def my_class(request, my_class):
    class_list = MyClass.objects.filter(level="PRE")
    context = {'class_list': class_list}
    return render(request, "pris/myclass.html", context)

@login_required
def store_records_data(request):
    select_val = request.GET.get('selectVal')
    print(select_val)
    data = StoreItem.objects.get(id=select_val)
    return HttpResponse(data.unit)


@login_required
def store_records(request):

    if request.method == 'POST':

        print(request.POST)
        if 'save-new-items' in request.POST:

            for i in request.POST:
                if 'item-add-name-' in i:
                    item_add_id = i.replace('item-add-name-', '')
                    name = request.POST.get(f'item-add-name-{item_add_id}')
                    unit = request.POST.get(f'item-add-unit-{item_add_id}')
                    StoreItem.objects.create(name= name, unit= unit, qty=0)

        elif 'confirm-delete-item' in request.POST:
            id = request.POST['confirm-delete-item']
            StoreItem.objects.get(id=id).delete()

        elif 'edit-item' in request.POST:
            id = request.POST['edit-item']
            name = request.POST.get(f'item-edit-name-{id}')
            unit = request.POST.get(f'item-edit-unit-{id}')
            StoreItem.objects.filter(id=id).update(name= name, unit= unit)

        elif 'save-new-records' in request.POST:

            for i in request.POST:
                if 'item-record-name-' in i:
                    item_record_id = i.replace('item-record-name-', '')
                    item_id = request.POST.get(f'item-record-name-{item_record_id}')
                    qty = request.POST.get(f'item-record-qty-{item_record_id}')
                    date = request.POST.get(f'item-record-date-{item_record_id}')
                    in_or_out = request.POST.get(f'item-record-in/out-{item_record_id}')
                    date_f = datetime.datetime.strptime(date, '%d %B %Y').date()
                    item = StoreItem.objects.get(id=item_id)
                    record = StoreRecord()
                    record.item=item
                    record.qty=int(qty)
                    record.date=date_f
                    if in_or_out == 'out':
                        # StoreRecord.objects.create(item=item, qty=int(qty), date=date_f, going_out=True)
                        record.going_out=True
                    else:
                        # StoreRecord.objects.create(item=item, qty=int(qty), date=date_f, going_out=False)
                        record.going_out=False
                    record.save()

        elif 'confirm-delete-record' in request.POST:
            id = request.POST['confirm-delete-record']
            StoreRecord.objects.get(id=id).delete()

        elif 'edit-record' in request.POST:
            id = request.POST['edit-record']
            item_id = request.POST.get(f'edit-record-name-{id}')
            qty = request.POST.get(f'edit-record-qty-{id}')
            date = request.POST.get(f'edit-record-date-{id}')
            in_or_out = request.POST.get(f'edit-record-in/out-{id}')
            date_f = datetime.datetime.strptime(date, '%d %B %Y').date()
            item = StoreItem.objects.get(id=item_id)
            if in_or_out == 'out':
                StoreRecord.objects.filter(id=id).update(item=item, qty=qty, date=date_f, going_out=True)
            else:
                StoreRecord.objects.filter(id=id).update(item=item, qty=qty, date=date_f, going_out=False)


    store_items = StoreItem.objects.all()
    store_records = StoreRecord.objects.all()
    context = {'store_records': store_records, 'store_items': store_items}
    return render(request, "pris/store-records.html", context)

@login_required
def exam_group_main_list(request):
    if request.method == 'POST':
        exam_type = request.POST['exam-type']
        start_date = request.POST['start-date']
        end_date = request.POST['end-date']
        try:
            start_date = datetime.datetime.strptime(start_date, '%d %B %Y')
            end_date = datetime.datetime.strptime(end_date, '%d %B %Y')
            ExamGroupMain.objects.create(start_date=start_date, end_date=end_date, exam_type=exam_type)
        except:
            messages.error(request,'Already Exists!')
    exams = ExamGroupMain.objects.all()
    report_list = []
    for exam in exams:
        average = AcademicProgress.objects.filter(
            exam__exam_group__exam_group_main=exam).aggregate(Avg('marks'))['marks__avg']
        try:
            average = round(average, 1)
        except:
            average = 0

        report_list.append({'exam': exam, 'average': average})
    context = {'report_list': report_list, }
    return render(request, "pris/exam-group-main-list.html", context)


@login_required
def exam_group_list(request,id):
    exams = ExamGroup.objects.filter(exam_group_main__id=id)
    main = ExamGroupMain.objects.get(id=id)
    report_list = []
    for exam in exams:
        average = AcademicProgress.objects.filter(exam__exam_group=exam).aggregate(Avg('marks'))['marks__avg']
        try:
            average = round(average, 1)
        except:
            average = 0

        report_list.append({'exam':exam,'average':average})
    context = {'report_list': report_list, 'main': main}
    return render(request, "pris/exam-group-list.html", context)

@login_required
def exam_list(request,id):
    exams = Exam.objects.filter(exam_group__id=id)
    main = ExamGroup.objects.get(id=id)
    report_list = []
    for exam in exams:
        average = AcademicProgress.objects.filter(exam=exam).aggregate(Avg('marks'))['marks__avg']
        try:
            average = round(average, 1)
        except:
            average = 0
        report_list.append({'exam':exam,'average':average})
    context = {'report_list': report_list, 'main':main}
    return render(request, "pris/exam-list.html", context)

@login_required
def exam_list_report_pdf(request,id):
    exams = Exam.objects.filter(exam_group__id=id)
    main = ExamGroup.objects.get(id=id)
    report_list = []
    pupils = []
    report = AcademicProgress.objects.filter(exam__exam_group=main)
    for i in report:
        if len(pupils) >= 1:
            if i.pupil not in pupils:
                pupils.append(i.pupil)
        else:
            pupils.append(i.pupil)
    for pupil in pupils:
        report = []
        for subject in main.myclass.subject_set.all():
            a = AcademicProgress.objects.get(Q(exam__exam_group=main) & Q(exam__subject=subject) & Q(pupil=pupil))
            report.append(a)
        total = AcademicProgress.objects.filter(Q(exam__exam_group=main) & Q(pupil=pupil)).aggregate(Sum('marks'))['marks__sum']
        average = AcademicProgress.objects.filter(Q(exam__exam_group=main) & Q(pupil=pupil)).aggregate(Avg('marks'))['marks__avg']
        report_list.append({'pupil': pupil, 'report': report, 'total': total, 'average': round(average,1)})
    subjects = []
    for subject in main.myclass.subject_set.all():
        average = AcademicProgress.objects.filter(Q(exam__exam_group=main) & Q(exam__subject=subject)).aggregate(Avg('marks'))['marks__avg']
        if average is not None:
            average = round(average, 1)
        subjects.append([subject, average])
    class_avg = AcademicProgress.objects.filter(Q(exam__exam_group=main)).aggregate(Avg('marks'))['marks__avg']
    if class_avg is not None:
        class_avg = round(class_avg,1)
    context = {'main':main, 'report_list':report_list,'subjects':subjects,'class_avg':class_avg}
    pdf = render_to_pdf("pdf/exam-list-report-pdf.html", context)
    return HttpResponse(pdf, content_type='application/pdf')

@login_required
def exam_report(request,id):
    exam = Exam.objects.get(id=id)
    if request.method == 'POST':
        if 'edit' in request.POST:
            pk = request.POST['edit']
            marks = request.POST['marks']
            AcademicProgress.objects.filter(pk=pk).update(marks=marks)

        if 'delete' in request.POST:
            pk = request.POST['delete']
            AcademicProgress.objects.get(pk=pk).delete()

        elif 'exam' in request.POST:
            myfile = request.FILES.get('myfile')
            form = ExamForm(request.POST, request.FILES, instance=exam)
            if form.is_valid():
                form.save()
    if exam.academicprogress_set.all().count() != 0:
        average = exam.academicprogress_set.all().aggregate(Avg('marks'))[
            'marks__avg']
        average = round(average,1)

    else:
        average = 0
    reports = AcademicProgress.objects.filter(exam=exam).order_by('-marks')
    Fs = AcademicProgress.objects.filter(exam=exam, marks__range=(0,34))
    Ds = AcademicProgress.objects.filter(exam=exam, marks__range=(35,49))
    Cs = AcademicProgress.objects.filter(exam=exam, marks__range=(50,64))
    Bs = AcademicProgress.objects.filter(exam=exam, marks__range=(65,84))
    As = AcademicProgress.objects.filter(exam=exam, marks__range=(85,100))
    context = {'exam': exam, 'average': average,'As':As,'Bs':Bs,'Cs':Cs,'Ds':Ds,'Fs':Fs,'reports':reports}
    return render(request, "pris/exam.html", context)


@login_required
def load_subjects(request):
    myclass = request.GET.get('class')
    myclass = MyClass.objects.get(name=myclass)
    subjects = myclass.subject_set.all()
    context = {'subjects':subjects}
    return render(request, "pris/load-class-subjects-dropdown-options.html", context)

@login_required
def load_exam_report(request):
    exam = request.GET.get('exam')
    exam = Exam.objects.get(pk=exam)
    context = {'exam':exam}
    return render(request, "pris/load-exam-report.html", context)


@login_required
def load_class_exam_report(request):
    myclass = request.GET.get('myclass')
    myclass = MyClass.objects.get(name=myclass)
    exams = Exam.objects.filter(
        exam_group__myclass=myclass, date__year=datetime.datetime.now().year)
    context = {'myclass': myclass,'exams':exams}
    return render(request, "pris/load-class-exam-report.html", context)


@login_required
def exam_create(request, id):
    exam = Exam.objects.get(id=id)
    if request.method == 'POST':
        if 'exam-create' in request.POST:
            subject = request.POST['subject']
            exam_type = request.POST['exam-type']
            date = datetime.datetime.strptime(request.POST['date'], '%d %B %Y')
            myclass = request.POST['class']
            # sections_count = request.POST['section-count']
            subject = Subject.objects.get(name=subject)
            myclass = MyClass.objects.get(name=myclass)
            # try:
            #     exam = Exam.objects.filter(id=exam.id).update(
            #         subject=subject, exam_type=exam_type, date=date, myclass=myclass)

            #     for i in range(sections_count):
            #         ExamSection.objects.create(
            #             exam=exam, name=f'Section {string.ascii_uppercase[i]}')

            #     context = {'exam': exam}
            # except IntegrityError:
            #     messages.warning(
            #         request, 'This exam already exists', extra_tags='exam_exists')
            #     context = {}
            return (redirect('exam-list'))
    try:
        doc = docx.Document(exam.exam.path)
        wholedoc = []
        x = 1
        z = string.digits

        # for para in doc.paragraphs:
        #     print (para.text)
        #     for v in z:
        #         print (v)

        #         if f'{v}.' in para.text:
        #             a = []
        #             a.append(para.text.strip(' '))
        #             wholedoc.append(a)

        #             break
        # # else:
        #     try:
        #         if para.text != '':
        #             print ('')

        #             if para.text not in a:
        #                 a.append(para.text.strip(' '))

        #     except:
        #         pass
            # wholedoc.append(para.text)
            # print(para.number)
            # print(wholedoc.append(para.text))

        context = {'exam': exam, 'doc': wholedoc}
    except:
        # wholedoc = []

        context = {'exam': exam,}

    return render(request, "pris/exam-create.html", context)


@login_required
def grade_book(request):
    if request.method == 'POST':
        myclass = MyClass.objects.get(name=request.POST['grade-book'])
        z = 0
        for i in request.POST:
            if 'marks' in i:
                pk = i.replace('marks', '')
                exam_pk = request.POST['myexam']
                marks = request.POST[i]
                print(i)
                pupil = Pupil.objects.get(pk=pk)
                exam = Exam.objects.get(pk=exam_pk)
                try:
                    AcademicProgress.objects.filter(
                        pupil=pupil, exam=exam).update(marks=marks)
                except:
                    pass
            messages.success(request, 'saved')
    return render(request, "pris/grade-book.html")

@login_required
@user_passes_test(is_not_superuser)
def index(request):
    return render(request, "pris/index.html")


@user_passes_test(is_superuser)
def index2(request):
    if request.method == 'POST':
        if 'add' in request.POST:
            pk = request.POST['add']
            qty = request.POST['qty']
            price_1 = request.POST['price-1']
            asset_add = Asset.objects.get(pk=pk)
            new_qty = asset_add.qty + int(qty)
            new_price = asset_add.price + (int(price_1) * int(qty))
            Asset.objects.filter(pk=pk).update(qty=new_qty, price=new_price)
        elif 'new' in request.POST:
            name = request.POST['name']
            qty = request.POST['qty']
            price_1 = request.POST['price-1']
            price = int(qty) * int(price_1)
            if Asset.objects.filter(name=name).exists():
                messages.info(request, 'Asset already exists!',
                              extra_tags='msg_new')
            else:
                Asset.objects.create(name=name, qty=qty, price=price)

        elif 'edit' in request.POST:
            pk = request.POST['edit']
            name = request.POST['name']
            qty = request.POST['qty']
            price = request.POST['price']
            Asset.objects.filter(pk=pk).update(qty=qty, price=price, name=name)

        # elif 'sell' in request.POST:
        #     pk = request.POST['sell']
        #     name = request.POST['name']
        #     qty = request.POST['qty']
        #     price_1 = request.POST['price-1']
        #     asset_add = Asset.objects.get(pk=pk)
        #     price = int(qty) * int(price_1)
        #     new_qty = asset_add.qty - int(qty)
        #     new_price = asset_add.price - (int(price_1) * int(qty))
        #     if CashBook.objects.filter(description=f'Sales( {qty} {name} @ {price_1} )', amount=price, date=datetime.datetime.now(), acc_type='DR').exists():
        #         transaction = CashBook.objects.get(
        #             description=f'Sales( {qty} {name} @ {price_1} )', amount=price, date=datetime.datetime.now(), acc_type='DR')
        #         messages.info(
        #             request, f"{transaction.description} {datetime.datetime.strftime(transaction.date, '%d %B %Y')}", extra_tags='msg_sell')
        #     else:
        #         CashBook.objects.create(
        #             description=f'Sales( {qty} {name} @ {price_1} )', amount=price, date=datetime.datetime.now(), acc_type='DR')
        #         Asset.objects.filter(pk=pk).update(
        #             qty=new_qty, price=new_price)
        #         return redirect('cash-book')

    try:
        acc = ChartOfAccounts.objects.get(name__iexact='banks')
        income_query = Journal.objects.filter(Q(acc_no__parent=acc) & Q(is_posted=True))
        income = income_query.aggregate(Sum('amount'))['amount__sum']
        if income is None:
            income = 0
        expenses_query = Journal.objects.filter(Q(bal_acc_no__parent=acc) & Q(is_posted=True) )
        expenses = expenses_query.aggregate(Sum('amount'))['amount__sum']
        if expenses is None:
            expenses = 0
        total = income + expenses
        balance = income - expenses
        if total != 0:
            income_p = percent(income, total)
            expenses_p = percent(expenses, total)
        else:
            income_p = 0
            expenses_p = 0
    except:
        income, expenses = 0, 0
        income_p, expenses_p = 0, 0
        balance = 0
        return redirect('chart-of-accs')


    end_date = datetime.date.today()
    start_date = end_date - datetime.timedelta(days=10)

    cashbook = Journal.objects.filter(Q(acc_no__parent=acc) | Q(bal_acc_no__parent=acc), is_posted=True).order_by('date')
    balance_list = []
    income_list = []
    expenses_list = []
    date_list = []

    for i in cashbook:
        try:
            if i.date == Journal.objects.get(id=(i.id-1), is_posted=True).date:
                if i.acc_no.parent == acc:
                    income_list[-1] += i.amount
                    y = i.amount
                    x = 0
                else:
                    y = 0
                    x = i.amount
                    expenses_list[-1] += i.amount
                z = income_list[-1]-expenses_list[-1]
                balance_list[-1] += (y-x)

            else:
                date_list.append(datetime.datetime.strftime(
                    i.date, '%d %b'))

                if i.acc_no.parent == acc:
                    income_list.append(i.amount)
                    expenses_list.append(0)
                else:
                    income_list.append(0)
                    expenses_list.append(i.amount)
                x = income_list[-1]-expenses_list[-1]
                balance_list.append(balance_list[-1]+x)
        except:
            date_list.append(datetime.datetime.strftime(
                i.date, '%d %b'))
            if i.acc_no.parent == acc:
                income_list.append(i.amount)
                expenses_list.append(0)
            else:
                income_list.append(0)
                expenses_list.append(i.amount)

            x = income_list[-1]-expenses_list[-1]
            balance_list.append(x)
    context = {'balance_list': balance_list, 'expenses_list': expenses_list, 'income_list': income_list, 'date_list': date_list, 'assets': assets, 'income': income, 'expenses': expenses, 'balance': balance,
               'income_p': income_p, 'expenses_p': expenses_p,
               }
    return render(request, "pris/index2.html", context)


@user_passes_test(is_superuser)
def invoice(request):
    if request.method == 'POST':
        if 'amount' in request.POST:
            usernames_list = request.POST['usernames'].split(',')
            amount = request.POST['amount']
            date = request.POST['date']
            date = datetime.datetime.strptime(date, '%d %B %Y').date()
            description = request.POST['description']
            if 'tuition' in description:
                bal_acc_no = ChartOfAccounts.objects.get(name__iexact='tuition fee')
            else:
                bal_acc_no = ChartOfAccounts.objects.get(name__iexact='transport fee')
            for i in usernames_list:
                inv_no = doc_no_func('invoice')
                try:
                    customer_acc = ChartOfAccounts.objects.get(start=i)
                    Journal.objects.create(doc_type='invoice', doc_no=inv_no, date=date, description=description, acc_type='customer', acc_no=customer_acc, bal_acc_type='g/ledger', bal_acc_no=bal_acc_no, amount=amount)
                except:
                    messages.error(request,'no pupil is selected or amount is empty')
        elif 'amount' not in request.POST:
            for i in request.POST:
                if 'post' in i:
                    pk = i.replace('post', '')
                    invoice = Journal.objects.get(pk=pk)
                    invoice.is_posted = True
                    invoice.save()

            for i in request.POST:
                if 'post' in i:
                    return redirect('customer')

    debtors = ChartOfAccounts.objects.get(name__iexact='debtors')
    accs = debtors.children.all()
    inv = Journal.objects.filter(is_posted=False)
    context={'accs':accs,'inv':inv}
    return render(request, 'pris/invoice.html', context)

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if 'staff' == request.POST['options']:
                if user.is_superuser:
                    login(request, user)
                    messages.info(request, 'loading...', extra_tags='loader')
                    # return redirect('index2')
                    return redirect('store_records')
                elif user.is_tr:
                    login(request, user)
                    messages.info(request, 'loading...', extra_tags='loader')
                    return redirect('index')
            else:
                if user.is_pupil:
                    login(request, user)
                    messages.info(request, 'loading...', extra_tags='loader')
                    return redirect('index')

        messages.error(request, 'incorrect username.')
    return render(request, "pris/login.html", )


@login_required
def logout_view(request):
    logout(request)
    return redirect('login')


@user_passes_test(is_superuser)
def list_employees(request):
    employees = Employee.objects.all()
    context = {'employees': employees}
    return render(request, "pris/list-employees.html", context)


@login_required
def list_pupils(request):
    return render(request, "pris/list-pupils.html", )

@login_required
def profile(request, username):
    # s_user is selected user
    # username = username.replace('-', '/')
    s_user = User.objects.get(username=username)
    if s_user.is_pupil:
        pupil = Pupil.objects.get(user=s_user)
        customer_acc = ChartOfAccounts.objects.get(name=s_user.get_fullname())
        p_acc = Journal.objects.filter(Q(acc_no=customer_acc) | Q(bal_acc_no=customer_acc), is_posted=True)
        # report = AcademicProgress.objects.filter(pupil=pupil)
        # p_acc = None
        subject_exam_marks_list_st = {}
        for subject in pupil.myclass.subject_set.all():
            try:
                monthly_first_st = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Monthly') & Q(
                    exam__subject=subject) & Q(exam__date__year=datetime.datetime.now().year) & Q(exam__date__month=2), pupil=pupil)
            except:
                monthly_first_st = None

            try:
                exam_first_st = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                    exam__subject=subject) & Q(exam__date__year=datetime.datetime.now().year) & Q(exam__date__month__lt=7), pupil=pupil)
            except:
                exam_first_st = None

            try:
                monthly_last_st = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Monthly') & Q(
                    exam__subject=subject) & Q(exam__date__year=datetime.datetime.now().year) & Q(exam__date__month=4), pupil=pupil)
            except:
                monthly_last_st = None

            try:
                exam_last_st = pupil.academicprogress_set.get(Q(exam__exam_group__exam_group_main__exam_type='Terminal') & Q(
                    exam__subject=subject) & Q(exam__date__year=datetime.datetime.now().year) & Q(exam__date__month__lt=7))
            except:
                exam_last_st = None

            each_subject_exam_marks_list_st = [
                monthly_first_st, exam_first_st, monthly_last_st, exam_last_st]
            subject_exam_marks_list_st[subject] = each_subject_exam_marks_list_st

        pupil_report_st = {'pupil': pupil,
                           'subject_exam_marks_list_st': subject_exam_marks_list_st}

        subject_exam_marks_list_nd = {}
        for subject in pupil.myclass.subject_set.all():
            try:
                monthly_first_nd = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Monthly') & Q(
                    exam__subject=subject) & Q(exam__date__year=datetime.datetime.now().year) & Q(exam__date__month=8), pupil=pupil)
            except:
                monthly_first_nd = None
            try:
                exam_first_nd = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                    exam__subject=subject) & Q(exam__date__year=datetime.datetime.now().year) & Q(exam__date__month__gt=6), pupil=pupil)
            except:
                exam_first_nd = None
            try:
                monthly_last_nd = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Monthly') & Q(
                    exam__subject=subject) & Q(exam__date__year=datetime.datetime.now().year) & Q(exam__date__month=10), pupil=pupil)
            except:
                monthly_last_nd = None
            try:
                exam_last_nd = pupil.academicprogress_set.get(Q(exam__exam_group__exam_group_main__exam_type='Annual') & Q(
                    exam__subject=subject) & Q(exam__date__year=datetime.datetime.now().year))
            except:
                exam_last_nd = None

            each_subject_exam_marks_list_nd = [
                monthly_first_nd, exam_first_nd, monthly_last_nd, exam_last_nd]
            subject_exam_marks_list_nd[subject] = each_subject_exam_marks_list_nd

        pupil_report_nd = {'pupil': pupil,
                           'subject_exam_marks_list_nd': subject_exam_marks_list_nd}
    else:
        employee = Employee.objects.get(user=s_user)
        # p_acc = [0]
        # report = [0]
    if request.method == 'POST':
        print('hey')
        if 'x' in request.POST:
            print('hello')
            myfile = request.FILES.get('photo')
            x = request.POST['x']
            y = request.POST['y']
            w = request.POST['width']
            h = request.POST['height']

            if myfile:
                form = PhotoForm(request.POST, request.FILES, instance=s_user)
                if form.is_valid():
                    form = form.save(commit=False)
                    form.photo = myfile
                    form.save()
            if not myfile:
                image = Image.open(s_user.photo)
                cropped_image = image.crop((round(float(x)), round(float(y)), round(float(w))+round(float(x)), round(float(h))+round(float(y))))

                resized_image = cropped_image.resize((256, 256), Image.ANTIALIAS)

                resized_image.save(s_user.photo.path)

        elif 'task' in request.POST:
            teacher = Teacher.objects.get(employee__user__username=request.POST['teacher'])
            date = datetime.datetime.strptime(
                request.POST['due-date'], '%d %B %Y %I:%M %p')
            Task.objects.create(teacher=teacher, task_type=request.POST['task-type'], task=request.POST['task-msg'], due_date=date)

        elif 'delete' in request.POST:
            s_user.delete()
            return redirect('list-pupil')

    elif request.method == 'GET':
        checker = request.GET.get('checker')
        if checker == 'active':
            s_user.is_active = True
            s_user.save()
            return HttpResponse('active')
        elif checker == 'inactive':
            s_user.is_active = False
            s_user.save()
            return HttpResponse('not active')

    form = PhotoForm()
    if s_user.is_pupil:
        context = {'s_user': s_user, 'form': form, 'p_acc': p_acc,
                   'pupil_report_st': pupil_report_st, 'pupil_report_nd': pupil_report_nd,'customer_acc':customer_acc}
    else:
        context = {'s_user': s_user, 'form':form}
    return render(request, "pris/profile.html", context)


@user_passes_test(is_superuser)
def register(request):
    if request.method == 'POST':
        middle_name = request.POST.get('middle-name').upper()
        first_name = request.POST['first-name'].upper()
        last_name = request.POST['last-name'].upper()
        username = request.POST['username']
        password = request.POST['password']
        photo = request.FILES.get('photo')
        email = request.POST.get('email')
        sex = request.POST['gender']
        try:
            c_user = User.objects.create_user(first_name=first_name, middle_name=middle_name, last_name=last_name, username=username, password=password, sex=sex)

            if request.POST.get('superuser'):
                c_user.is_superuser = True
                c_user.save()

            form = PhotoForm(request.POST, request.FILES, instance=c_user)
            if form.is_valid():
                form.save()
            messages.success(request, f'Created user:{c_user}', extra_tags='success')
        except:
            messages.error(request,'Failed to create user', extra_tags='error')
    return render(request, "pris/register.html")


@user_passes_test(is_superuser)
def register_employee(request):
    if request.method == 'POST':
        try:
            first_name = request.POST['first-name'].upper()
            last_name = request.POST['last-name'].upper()
            middle_name = request.POST.get('middle-name').upper()
            photo = request.FILES.get('photo')
            sex = request.POST['sex']
            email = request.POST.get('email')
            contacts = request.POST.get('contacts')
            if request.POST.get('birth-date'):
                birth_date = datetime.datetime.strptime(
                    request.POST['birth-date'], '%d %B %Y')
            else:
                birth_date = None

            date_employed = datetime.datetime.strptime(
                request.POST['date-employed'], '%d %B %Y')
            p = password_func()
        except:
            messages.error(request, 'Incorrect data format',
                           extra_tags='error')
        try:
            if request.POST['category'] == 'Teacher':
                new_user = User.objects.create_user(
                    username=admission_number_func(date_employed, 'EMP'), first_name=first_name, last_name=last_name, middle_name=middle_name, password=p, keeper=p, date_joined=date_employed, is_employee=True, is_tr=True, sex=sex, birth_date=birth_date, email=email)

                if request.POST['TR-status'] == 'HT':
                    new_user.employee.teacher.is_ht = True

                elif request.POST['TR-status'] == 'CT':
                    new_user.employee.teacher.is_ct = True

                elif request.POST['TR-status'] == 'AC':
                    new_user.employee.teacher.is_ac = True

                elif request.POST['TR-status'] == 'DC':
                    new_user.employee.teacher.is_dc = True

                new_user.employee.teacher.save()
            else:
                new_user = User.objects.create_user(
                    username=admission_number_func(date_employed, 'EMP'), first_name=first_name, last_name=last_name, middle_name=middle_name, password=p, keeper=p, date_joined=date_employed, is_employee=True, sex=sex, birth_date=birth_date)
            if contacts:
                for i in contacts.split(','):
                    Contact.objects.create(user=new_user, relation='me',name='me', tel=i)
            new_user.employee.category = request.POST['category']
            new_user.employee.save()

            if request.POST.get('is-IT'):
                new_user.is_it = True
                new_user.save()

            form = PhotoForm(request.POST, request.FILES, instance=new_user)
            if form.is_valid():
                form.save()

            messages.success(request, f'Created Employee: {new_user}', extra_tags='success')

        except:
            messages.error(request, 'Employee already added', extra_tags='error')

    return render(request, "pris/register-employee.html")


@login_required
def register_pupil(request):
    if request.method == 'POST':
        try:
            # child info
            class_applied = request.POST.get('class-applied')
            class_admitted = request.POST.get('class-admitted')
            date_admitted = request.POST['date-admitted']
            middle_name = request.POST.get('middle-name').upper()
            first_name = request.POST['first-name'].upper()
            last_name = request.POST['last-name'].upper()
            photo = request.FILES.get('photo')
            sex = request.POST['sex']
            birth_place = request.POST.get('birth-place')
            birth_date = request.POST['birth-date']

            # prev school 1 info
            prev_1_name = request.POST.get('prev-1-name')
            prev_1_medium = request.POST.get('prev-1-medium')
            prev_1_date_admitted = request.POST.get('prev-1-date-admitted')
            prev_1_date_left = request.POST.get('prev-1-date-left')
            prev_1_reasons = request.POST.get('prev-1-reasons')
            prev_1_medium = request.POST.get('prev-1-medium')
            prev_1_report = request.POST.get('prev-1-report')

            # prev school 2 info
            prev_2_name = request.POST.get('prev-2-name')
            prev_2_medium = request.POST.get('prev-2-medium')
            prev_2_date_admitted = request.POST.get('prev-2-date-admitted')
            prev_2_date_left = request.POST.get('prev-2-date-left')
            prev_2_reasons = request.POST.get('prev-2-reasons')
            prev_2_medium = request.POST.get('prev-2-medium')
            prev_2_report = request.POST.get('prev-2-report')


            reasons_at_malen = request.POST.get('reasons-at-malen')

            # medications
            dpt = request.POST.get('dpt')
            diputheria = request.POST.get('diputheria')
            tetanus = request.POST.get('tetanus')
            pertussis = request.POST.get('pertussis')
            pv = request.POST.get('pv')
            diabetes = request.POST.get('diabetes')
            epilepsy = request.POST.get('epilepsy')
            convulsion = request.POST.get('convulsion')
            asthma = request.POST.get('asthma')
            tb = request.POST.get('tb')
            rheumatism = request.POST.get('rheumatism')
            eye_problems = request.POST.get('eye-problems')
            physical_disabilities = request.POST.get('physical-disabilities')
            medication = request.POST.get('medication')

            # allergies
            allergy_1 = request.POST.get('allergy1')
            allergy_2 = request.POST.get('allergy2')
            allergy_3 = request.POST.get('allergy3')
            allergy_4 = request.POST.get('allergy4')

            # father info
            father_first_name = request.POST.get('father-first-name')
            father_middle_name = request.POST.get('father-middle-name')
            father_last_name = request.POST.get('father-last-name')
            father_region = request.POST.get('father-region')
            father_village_street = request.POST.get('father-village-street')
            father_ward = request.POST.get('father-ward')
            father_division = request.POST.get('father-division')
            father_district = request.POST.get('father-district')
            father_postal_address = request.POST.get('father-postal-address')
            father_tel_home = request.POST.get('father-tel-home')
            father_tel_office = request.POST.get('father-tel-office')
            father_mob = request.POST.get('father-mob')
            father_occupation = request.POST.get('father-occupation')
            father_nationality = request.POST.get('father-nationality')
            father_tribe = request.POST.get('father-tribe')
            father_religion = request.POST.get('father-religion')
            father_denomination = request.POST.get('father-denomination')

            # mother info
            mother_first_name = request.POST.get('mother-first-name')
            mother_middle_name = request.POST.get('mother-middle-name')
            mother_last_name = request.POST.get('mother-last-name')
            mother_region = request.POST.get('mother-region')
            mother_village_street = request.POST.get('mother-village-street')
            mother_ward = request.POST.get('mother-ward')
            mother_division = request.POST.get('mother-division')
            mother_district = request.POST.get('mother-district')
            mother_postal_address = request.POST.get('mother-postal-address')
            mother_tel_home = request.POST.get('mother-tel-home')
            mother_tel_office = request.POST.get('mother-tel-office')
            mother_mob = request.POST.get('mother-mob')
            mother_occupation = request.POST.get('mother-occupation')
            mother_tribe = request.POST.get('mother-tribe')
            mother_nationality = request.POST.get('mother-nationality')
            mother_religion = request.POST.get('mother-religion')
            mother_denomination = request.POST.get('mother-denomination')

            # immediate contacts
            emergence_name = request.POST.get('emergence-name')
            emergence_relation = request.POST.get('emergence-relation')
            emergence_address = request.POST.get('emergence-address')
            emergence_mob = request.POST.get('emergence-mob')

            payer_name = request.POST.get('payer-name')
            payer_relation = request.POST.get('payer-relation')
            payer_address = request.POST.get('payer-address')
            payer_mob = request.POST.get('payer-mob')

            # date objects
            birth_date = datetime.datetime.strptime(
                birth_date, '%d %B %Y').date()

            if prev_1_date_admitted:
                prev_1_date_admitted = datetime.datetime.strptime(
                    prev_1_date_admitted, '%d %B %Y').date()
            else:
                prev_1_date_admitted = None


            if prev_1_date_left:
                prev_1_date_left = datetime.datetime.strptime(
                    prev_1_date_left, '%d %B %Y').date()
            else:
                prev_1_date_left = None


            if prev_2_date_admitted:
                prev_2_date_admitted = datetime.datetime.strptime(
                    prev_2_date_admitted, '%d %B %Y').date()
            else:
                prev_2_date_admitted = None


            if prev_2_date_left:
                prev_2_date_left = datetime.datetime.strptime(
                    prev_2_date_left, '%d %B %Y').date()
            else:
                prev_2_date_left = None


            date_admitted = datetime.datetime.strptime(
                date_admitted, '%d %B %Y').date()

            # password generate
            p = password_func()

            # create user
            try:
                if (birth_date < datetime.date.today()) & (date_admitted < datetime.date.today()):
                    new_user = User.objects.create_user(username=admission_number_func(
                        date_admitted, 'PUP'), first_name=first_name, middle_name=middle_name, last_name=last_name, is_pupil=True, password=p, keeper=p, sex=sex, date_joined=date_admitted, birth_date=birth_date)
                else:
                    messages.error(request, 'Check the birth date or date admitted, please!',
                                   extra_tags='error')
                pupil = Pupil.objects.get(user=new_user)

                new_user.pupil.class_joined = MyClass.objects.get(position=class_admitted)
                new_user.pupil.grade()
                new_user.pupil.claas_applied = MyClass.objects.get(position=class_applied)
                new_user.pupil.birth_place = birth_place
                new_user.pupil.reasons_at_malen = reasons_at_malen
                new_user.pupil.status = 'active'
                new_user.pupil.save()

                if father_first_name:
                    GuardianParticulars.objects.create(pupil=pupil, first_name=father_first_name, last_name=father_last_name, middle_name=father_middle_name, relation='father', tel_office=father_tel_office, tel_home=father_tel_home, mob=father_mob, nationality=father_nationality,region=father_region, village_street=father_village_street,district=father_district, division=father_division, ward=father_ward, tribe=father_tribe, occupation=father_occupation, religion=father_religion, denomination=father_denomination, postal_address=father_postal_address)
                if mother_first_name:
                    GuardianParticulars.objects.create(pupil=pupil, first_name=mother_first_name, last_name=mother_last_name, middle_name=mother_middle_name, relation='mother', tel_office=mother_tel_office, tel_home=mother_tel_home, mob=mother_mob, nationality=mother_nationality,region=mother_region, village_street=mother_village_street,district=mother_district, division=mother_division, ward=mother_ward, tribe=mother_tribe, occupation=mother_occupation, religion=mother_religion, denomination=mother_denomination, postal_address=mother_postal_address)

                if dpt:
                    new_user.pupil.medicalrecords.is_dpt = True
                if diputheria:
                    new_user.pupil.medicalrecords.is_diputheria = True
                if tetanus:
                    new_user.pupil.medicalrecords.is_tetanus =True
                if pertussis:
                    new_user.pupil.medicalrecords.is_pertussis = True
                if pv:
                    new_user.pupil.medicalrecords.is_pv = True
                if diabetes:
                    new_user.pupil.medicalrecords.is_diabetes = True
                if epilepsy:
                    new_user.pupil.medicalrecords.is_epilepsy = True
                if convulsion:
                    new_user.pupil.medicalrecords.is_convulsion = True
                if asthma:
                    new_user.pupil.medicalrecords.is_asthma = True
                if tb:
                    new_user.pupil.medicalrecords.is_tb = True
                if rheumatism:
                    new_user.pupil.medicalrecords.is_rheumatism = True
                if eye_problems:
                    new_user.pupil.medicalrecords.is_eye_problems = True
                if physical_disabilities:
                    new_user.pupil.medicalrecords.is_physical_disabilities = True

                new_user.pupil.medicalrecords.medication = medication
                new_user.pupil.medicalrecords.save()

                medical_records = MedicalRecords.objects.get(pupil=pupil)

                if allergy_1:
                    Allergy.objects.create(medical_records=medical_records, name=allergy_1)

                if allergy_3:
                    Allergy.objects.create(medical_records=medical_records, name=allergy_2)

                if allergy_3:
                    Allergy.objects.create(medical_records=medical_records, name=allergy_3)

                if allergy_4:
                    Allergy.objects.create(medical_records=medical_records, name=allergy_4)

                if prev_1_name:
                    prev1 = PreviousSchool.objects.create(name=prev_1_name,  pupil=new_user.pupil, date_admitted=prev_1_date_admitted, date_left=prev_1_date_left, reasons=prev_1_reasons, medium=prev_1_medium,)
                    if prev_1_report:
                        prev1.is_report_attached = True
                        prev1.save()

                if prev_2_name:
                    prev2 = PreviousSchool.objects.create(name=prev_2_name,  pupil=new_user.pupil, date_admitted=prev_2_date_admitted, date_left=prev_2_date_left, reasons=prev_2_reasons, medium=prev_2_medium,)
                    if prev_2_report:
                        prev2.is_report_attached = True
                        prev2.save()

                form = PhotoForm(request.POST, request.FILES, instance=new_user)
                if form.is_valid():
                    form.save()
                if father_mob:
                    Contact.objects.create(user=new_user, name=f'{father_first_name} {father_middle_name} {father_last_name}', relation='father', tel=father_mob, address=father_postal_address, )

                if father_tel_home:
                    Contact.objects.create(user=new_user, name=f'{father_first_name} {father_middle_name} {father_last_name}', relation='father',
                                           tel=father_tel_home, address=father_postal_address, )

                if father_tel_office:
                    Contact.objects.create(user=new_user, name=f'{father_first_name} {father_middle_name} {father_last_name}', relation='father', tel=father_tel_office, address=father_postal_address, )


                if mother_mob:
                    Contact.objects.create(user=new_user, name=f'{mother_first_name} {mother_middle_name} {mother_last_name}',
                                           relation='mother', tel=mother_mob, address=mother_postal_address, )

                if mother_tel_home:
                    Contact.objects.create(user=new_user, name=f'{mother_first_name} {mother_middle_name} {mother_last_name}', relation='mother',
                                           tel=mother_tel_home, address=mother_postal_address, )

                if mother_tel_office:
                    Contact.objects.create(user=new_user, name=f'{mother_first_name} {mother_middle_name} {mother_last_name}', relation='mother', tel=mother_tel_office, address=mother_postal_address, )


                if emergence_mob:
                    for i in emergence_mob.split(','):
                        try:
                            contact = Contact.objects.get(user=new_user, tel=i)
                            contact.for_emergency = True
                            contact.save()
                        except:
                            Contact.objects.create(user=new_user, name=emergence_name, relation=emergence_relation, tel=i, address=emergence_address, for_emergency=True)
                if payer_mob:
                    for i in emergence_mob.split(','):

                        try:
                            contact = Contact.objects.get(user=new_user, tel=i)
                            contact.for_payment = True
                            contact.save()
                        except:
                            Contact.objects.create(user=new_user, name=payer_name, relation=payer_relation, tel=i, address=payer_address, for_payment=True)



                messages.success(request, f'Created Pupil: {new_user}', extra_tags='success')

            except:
                messages.error(request, 'already added!', extra_tags='error')
        except:
            messages.error(request, 'your data entered is in correct/n plz kindly check your dates!', extra_tags='error')

    return render(request, "pris/register-pupil.html",)


@login_required
def report_card(request,):
    yrs = []
    yr = datetime.datetime.now().year
    recommendation_date = datetime.date(yr, 12, 31)
    pupils = []
    term = 'first-term'
    myclass = MyClass.objects.all().first()
    if request.method == 'POST':
        if 'get-class-year' in request.POST:
            myclass = request.POST['myclass']
            term = request.POST['term']
            yr = request.POST['year']
            myclass = MyClass.objects.get(name=myclass)
        elif 'save' in request.POST:

            for i in request.POST:
                if 'recommendation' in i:
                    if request.POST.get(i):
                        value = i.split('|')
                        # x = request.POST.get('recommendation')
                        recommendation_value = request.POST[i]
                        pupil = Pupil.objects.get(pk=value[1])
                        # subject = Subject.objects.get(name__iexact=value[2])
                        try:
                            Recommendation.objects.create(
                                pupil=pupil, date=recommendation_date, tag=value[2], term=value[3], recommendation=recommendation_value)
                        except:
                            Recommendation.objects.filter(pupil=pupil,  date=recommendation_date, tag=value[2], term=value[3]).update(
                                recommendation=recommendation_value)
                        term = value[3]
                        yr = recommendation_date.year
            myclass = MyClass.objects.get(name=request.POST['save'])

    report = AcademicProgress.objects.filter(
        Q(exam__date__year=yr) & Q(exam__exam_group__myclass=myclass),)

    for i in report:
        if len(pupils) >= 1:
            if i.pupil not in pupils:
                pupils.append(i.pupil)
        else:
            pupils.append(i.pupil)

    report_list = []
    for pupil in pupils:
        subject_exam_marks_list = {}
        if term == 'first-term':
            for subject in myclass.subject_set.all():
                try:
                    monthly_first = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Monthly') & Q(
                        exam__subject=subject) & Q(exam__date__year=yr) & Q(exam__date__month=2), pupil=pupil)
                except:
                    monthly_first = None

                try:
                    exam_first = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                        exam__subject=subject) & Q(exam__date__year=yr) & Q(exam__date__month__lt=7), pupil=pupil)
                except:
                    exam_first = None

                try:
                    monthly_last = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Monthly') & Q(
                        exam__subject=subject) & Q(exam__date__year=yr) & Q(exam__date__month=4), pupil=pupil)
                except:
                    monthly_last = None

                try:
                    exam_last = pupil.academicprogress_set.get(Q(exam__exam_group__exam_group_main__exam_type='Terminal') & Q(
                        exam__subject=subject) & Q(exam__date__year=yr) & Q(exam__date__month__lt=7))
                except:
                    exam_last = None
                each_subject_exam_marks_list = [
                    monthly_first, exam_first, monthly_last, exam_last]
                subject_exam_marks_list[subject] = each_subject_exam_marks_list

        else:
            for subject in myclass.subject_set.all():
                try:
                    monthly_first = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Monthly') & Q(
                        exam__subject=subject) & Q(exam__date__year=yr) & Q(exam__date__month=8), pupil=pupil)
                except:
                    monthly_first = None
                try:
                    exam_first = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                        exam__subject=subject) & Q(exam__date__year=yr) & Q(exam__date__month__gt=6), pupil=pupil)
                except:
                    exam_first = None
                try:
                    monthly_last = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Monthly') & Q(
                        exam__subject=subject) & Q(exam__date__year=yr) & Q(exam__date__month=10), pupil=pupil)
                except:
                    monthly_last = None
                try:
                    exam_last = pupil.academicprogress_set.get(Q(exam__exam_group__exam_group_main__exam_type='Annual') & Q(
                        exam__subject=subject) & Q(exam__date__year=yr))
                except:
                    exam_last = None
                each_subject_exam_marks_list = [
                    monthly_first, exam_first, monthly_last, exam_last]
                subject_exam_marks_list[subject] = each_subject_exam_marks_list

        rec_ac = Recommendation.objects.filter(
            pupil=pupil, tag='ac', date__year=recommendation_date.year, term=term).last()
        rec_ct = Recommendation.objects.filter(
            pupil=pupil, tag='ct', date__year=recommendation_date.year, term=term).last()
        pupil_report = {'pupil': pupil,
                        'subject_exam_marks_list': subject_exam_marks_list, 'rec_ac':rec_ac, 'rec_ct':rec_ct}
        report_list.append(pupil_report)

    for i in AcademicProgress.objects.all():
        if len(yrs) >= 1:
            if yrs[-1] != i.exam.date.year:
                yrs.append(i.exam.date.year)
        else:
            yrs.append(i.exam.date.year)
    context = {'myclass': myclass,
               'report_list': report_list, 'term': term, 'years': yrs, 'year': yr}
    return render(request, 'pris/report-card.html', context)


@login_required
def report_card_pdf(request, year, myclass, term):
    myclass = MyClass.objects.get(name=myclass)
    # pupils = myclass.pupil_set.all()
    report = AcademicProgress.objects.filter(
        Q(exam__date__year=year) & Q(exam__exam_group__myclass=myclass),)

    pupils = []

    for i in report:
        if len(pupils) >= 1:
            if i.pupil not in pupils:
                pupils.append(i.pupil)
        else:
            pupils.append(i.pupil)

    report_list = []
    for pupil in pupils:
        subject_exam_marks_list = {}
        if term == 'first-term':
            for subject in myclass.subject_set.all():

                try:
                    exam_first = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                        exam__subject=subject) & Q(exam__date__year=year) & Q(exam__date__month__lt=7), pupil=pupil).marks
                except:
                    exam_first = 0.0
                try:
                    exam_last = pupil.academicprogress_set.get(Q(exam__exam_group__exam_group_main__exam_type='Terminal') & Q(
                        exam__subject=subject) & Q(exam__date__year=year) & Q(exam__date__month__lt=7)).marks
                except:
                    exam_last = 0.0

                total = AcademicProgress.objects.filter((Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') | Q(exam__exam_group__exam_group_main__exam_type='Terminal')) & Q(
                    exam__date__year=year) & Q(exam__date__month__lt=7) & Q(
                        exam__subject=subject), pupil=pupil).aggregate(Sum('marks'))['marks__sum']
                try:
                    float(total)

                except:
                    if total == None:
                        total = 0.0

                each_subject_exam_marks_list = [
                    exam_first, exam_last, total]
                subject_exam_marks_list[subject] = each_subject_exam_marks_list

            exam_first_sum = AcademicProgress.objects.filter(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                exam__date__year=year) & Q(exam__date__month__lt=7), pupil=pupil).aggregate(Sum('marks'))['marks__sum']

            exam_last_sum = AcademicProgress.objects.filter(Q(exam__exam_group__exam_group_main__exam_type='Terminal') & Q(
                exam__date__year=year) & Q(exam__date__month__lt=7), pupil=pupil).aggregate(Sum('marks'))['marks__sum']

            exam_first_avg = AcademicProgress.objects.filter(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                exam__date__year=year) & Q(exam__date__month__lt=7), pupil=pupil).aggregate(Avg('marks'))['marks__avg']

            exam_last_avg = AcademicProgress.objects.filter(Q(exam__exam_group__exam_group_main__exam_type='Terminal') & Q(
                exam__date__year=year) & Q(exam__date__month__lt=7), pupil=pupil).aggregate(Avg('marks'))['marks__avg']

        else:
            for subject in myclass.subject_set.all():
                try:
                    exam_first = AcademicProgress.objects.get(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                        exam__subject=subject) & Q(exam__date__year=year) & Q(exam__date__month__gt=6), pupil=pupil).marks
                except:
                    exam_first = 0.0
                try:
                    exam_last = pupil.academicprogress_set.get(Q(exam__exam_group__exam_group_main__exam_type='Annual') & Q(
                        exam__subject=subject) & Q(exam__date__year=year) & Q(exam__date__month__gt=6),).marks
                except:
                    exam_last = 0.0

                total = AcademicProgress.objects.filter((Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') | Q(exam__exam_group__exam_group_main__exam_type='Annual')) & Q(
                    exam__date__year=year) & Q(exam__date__month__gt=6) & Q(
                    exam__subject=subject), pupil=pupil).aggregate(Sum('marks'))['marks__sum']
                try:
                    float(total)
                except:
                    if total == None:
                        total = 0.0
                each_subject_exam_marks_list = [
                    exam_first, exam_last, total]
                subject_exam_marks_list[subject] = each_subject_exam_marks_list

            exam_first_sum = AcademicProgress.objects.filter(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                exam__date__year=year) & Q(exam__date__month__gt=6), pupil=pupil).aggregate(Sum('marks'))['marks__sum']

            exam_last_sum = AcademicProgress.objects.filter(Q(exam__exam_group__exam_group_main__exam_type='Annual') & Q(
                exam__date__year=year) & Q(exam__date__month__gt=6), pupil=pupil).aggregate(Sum('marks'))['marks__sum']

            exam_first_avg = AcademicProgress.objects.filter(Q(exam__exam_group__exam_group_main__exam_type='Mid-Term') & Q(
                exam__date__year=year) & Q(exam__date__month__gt=6), pupil=pupil).aggregate(Avg('marks'))['marks__avg']

            exam_last_avg = AcademicProgress.objects.filter(Q(exam__exam_group__exam_group_main__exam_type='Annual') & Q(
                exam__date__year=year) & Q(exam__date__month__gt=6), pupil=pupil).aggregate(Avg('marks'))['marks__avg']

        try:
            exam_first_avg = round(exam_first_avg)
        except:
            exam_first_avg = 0.0
        try:
            exam_last_avg = round(exam_last_avg)
        except:
            exam_last_avg = 0.0

        if exam_last_sum == None:
            exam_last_sum = 0.0
        if exam_first_sum == None:
            exam_first_sum = 0.0

        customer_acc = ChartOfAccounts.objects.get(
            name=pupil.user.get_fullname())
        invoice = Journal.objects.filter(
            is_posted=True, acc_no=customer_acc, doc_no__startswith='INV').aggregate(Sum('amount'))['amount__sum']
        paid = Journal.objects.filter(is_posted=True, bal_acc_no=customer_acc,
                                      doc_no__startswith='REC').aggregate(Sum('amount'))['amount__sum']
        if paid is None:
            paid = 0
        if invoice is not None:
            debt = int(invoice) - int(paid)
        else:
            debt = 0

        rec_ac = Recommendation.objects.filter(
            pupil=pupil, tag='ac', date__year=year, term=term).last()

        rec_ct = Recommendation.objects.filter(
            pupil=pupil, tag='ct', date__year=year, term=term).last()

        pupil_report = {'pupil': pupil,
                        'subject_exam_marks_list': subject_exam_marks_list, 'exam_first_sum': exam_first_sum, 'exam_last_sum': exam_last_sum, 'exam_first_avg': exam_first_avg, 'exam_last_avg': exam_last_avg,'debt':debt,'rec_ac':rec_ac,'rec_ct':rec_ct}
        report_list.append(pupil_report)
    # midterm_sum = 0
    # terminal_sum = 0
    # for i in report_list:
    #     for value in i['subject_exam_marks_list']:
    #         x = subject_exam_marks_list[value]
    #         midterm_sum += x[0]
    #         terminal_sum += x[1]
    # print(float(total), terminal_sum)
    if term == 'first-term':
        checker = 'Terminal'
    else:
        checker = 'Annual'
    closing_period = Calendar.objects.filter(Q(name__icontains='closing') & Q(name__icontains='school') & Q(description__icontains=checker)).last()
    context = {'report_list': report_list,
               'term': term, 'pupils': pupils, 'year': year,'closing_period':closing_period}
    pdf = render_to_pdf('pdf/report-card-pdf.html', context)
    # myemail()
    return HttpResponse(pdf, content_type='application/pdf')


@user_passes_test(is_superuser)
def customer(request):
    pupils = Pupil.objects.all()
    fee = {}
    for pupil in pupils:
        customer_acc = ChartOfAccounts.objects.get(
            name=pupil.user.get_fullname())
        invoice = Journal.objects.filter(is_posted=True, acc_no=customer_acc, doc_no__startswith='INV').aggregate(Sum('amount'))['amount__sum']
        paid = Journal.objects.filter(is_posted=True, bal_acc_no=customer_acc,
                                      doc_no__startswith='REC').aggregate(Sum('amount'))['amount__sum']
        if paid is None:
            paid = 0
        if invoice is not None:
            debt = int(invoice) - int(paid)
        else:
            debt = 0

        fee[pupil] = [paid, debt]
    context = {'pupils': pupils, 'fee': fee}
    return render(request, "pris/customers.html", context)


@user_passes_test(is_superuser)
def setup(request):

    if request.method == 'POST':

        if 'subjects' in request.POST:
            subject_list = request.POST['subject-list'].split(',')

            # creates a newly added value
            for i in subject_list:
                if i == '':
                    pass
                else:
                    try:
                        Subject.objects.create(name=i)
                    except:
                        pass

            # deletes a deleted value
            for i in Subject.objects.all():
                if i.name in subject_list:
                    pass
                else:
                    i.delete()

        elif 'grade-levels' in request.POST:

            grade_levels = request.POST.get('grade-level').split(',')
            for grade_level in grade_levels:
                try:
                    GradeLevel.objects.create(name=grade_level)
                except:
                    pass
            # deletes a deleted value
            for i in GradeLevel.objects.all():
                if i.name in grade_levels:
                    pass
                else:
                    i.delete()
        elif 'classes' in request.POST:
            class_list = request.POST['class-list'].split(',')
            # creates a newly added
            z = 1
            for i in class_list:
                try:
                    MyClass.objects.create(name=i, position=z)
                except:
                    pass
                z += 1
            # deletes a deleted value
            for i in MyClass.objects.all():
                if i.name in class_list:
                    pass
                else:
                    i.delete()

        elif 'class-subjects-grade-level' in request.POST:
            for myclass in MyClass.objects.all():
                # try:
                grade_level = request.POST.get(f'{myclass}-grade-level')
                subject_list = request.POST.getlist(f'{myclass}-subjects')
                class_teacher = request.POST.get(f'{myclass}-teacher')
                fee = request.POST.get(f'{myclass}-fee')
                s_grade_level = GradeLevel.objects.get(
                    name=grade_level)
                myclass.level = s_grade_level
                myclass.save()
                try:
                    class_teacher = Teacher.objects.get(
                        employee__user__username=class_teacher)
                    myclass.class_tr = class_teacher
                    myclass.save()
                except:
                    pass

                try:
                    TuitionFee.objects.create(myclass=myclass, amount=fee)
                except:
                    pass
                subject_list_obj = []
                for subject in subject_list:
                    subject_list_obj.append(Subject.objects.get(name=subject))
                    # myclass.subject_set.add(
                    #     Subject.objects.get(name=subject))
                    # Subject.objects.get(name=subject)
                myclass.subject_set.set(subject_list_obj)

        elif 'total' in request.POST:
            start = request.POST['start']
            end = request.POST['end']
            name = request.POST['name']
            total_list = ChartOfAccounts.objects.all()
            if total_list.count() >= 1 :
                for t in ChartOfAccounts.objects.all():
                    if (t.start < int(start) < t.end) | (t.start < int(end) < t.end):
                        if t == ChartOfAccounts.objects.last():
                            messages.error(request, 'range overlapping')
                        else:
                            pass
                    else:
                        if t == ChartOfAccounts.objects.last():
                            try:
                                ChartOfAccounts.objects.create(name=name, start=int(start), end=int(end))
                            except:
                                messages.error(request, 'already exist!')
                        else:
                            pass
            else:
                ChartOfAccounts.objects.create(
                    name=name, start=start, end=end)

        elif 'chart-of-acc' in request.POST:
            total = request.POST['coa-total']
            acc_no = request.POST['acc-no']
            total = ChartOfAccounts.objects.get(id=total)
            if total.start < int(acc_no) < total.end:
                try:
                    ChartOfAccounts.objects.create(
                        name=request.POST['name'], acc_no=acc_no, total=total)
                except:
                    messages.error(request, 'Already Exists!')
            else:
                messages.error(request, 'Out of range!', extra_tags='coa')


    return render(request, 'pris/setup.html')


@user_passes_test(is_superuser)
def statement(request, statement_type):
    acc = ChartOfAccounts.objects.get(name=statement_type)

    cashbook = Journal.objects.filter(acc_no=acc)
    if cashbook == None:
        cashbook = Journal.objects.filter(bal_acc_no=acc)
    amount = cashbook.aggregate(Sum('amount'))['amount__sum']
    context = {'cashbook': cashbook,
               'statement': statement_type, 'amount': amount}
    return render(request, 'pris/statement.html', context)

