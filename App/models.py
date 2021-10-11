from django.db import models
from django.db.models import Sum
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.db.models.signals import post_save, pre_save, post_delete, pre_delete
from django.dispatch import receiver
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from mptt.models import MPTTModel, TreeForeignKey
import os

class ChartOfAccounts(MPTTModel):

    parent = TreeForeignKey(
        'self', on_delete=models.CASCADE, blank=True, null=True, related_name='children')
    start = models.IntegerField(unique=True)
    end = models.IntegerField(unique=True, blank=True, null=True)
    name = models.CharField(max_length=50, unique=True)
    amount = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class MPTTModel:
        order_insertion_by = ['name']

@ receiver(pre_save, sender=ChartOfAccounts)
def func(sender, instance, **kwargs):
    # c = ChartofAccounts.objects.all()
    if instance.parent:
        if instance.end == None:
            if instance.parent.start < instance.start < instance.parent.end:
                pass
            else:
                raise Exception('omg')
        else:
            if instance.parent.start < instance.start < instance.parent.end and instance.parent.start < instance.end < instance.parent.end:
                pass
            else:
                raise Exception('omg')


@ receiver(post_save, sender=ChartOfAccounts)
def suming(sender, instance, created, **kwargs):
    if created:
        a = instance
        while True:
            if a.parent:
                a = a.parent
                value = a.children.all().aggregate(
                    Sum('amount'))['amount__sum']
                a.amount = value
                a.save()
            else:
                break

class User(AbstractUser):
    middle_name = models.CharField(max_length=20)
    date_joined = models.DateField(default=timezone.now,)
    sex = models.CharField(max_length=10)
    photo = models.ImageField(upload_to='user/photo', blank=True, null=True)
    is_pupil = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    is_tr = models.BooleanField(default=False)
    is_it = models.BooleanField(default=False)
    birth_date = models.DateField(blank=True, null=True)
    keeper = models.CharField(max_length=8)

    def get_fullname(self):
        return f'{self.first_name} {self.middle_name} {self.last_name}'

    class Meta:
        unique_together = ['first_name','middle_name', 'last_name']

class Employee(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.CharField(max_length=30)


class Teacher(models.Model):
    employee = models.OneToOneField(Employee, on_delete=models.CASCADE)
    is_ht = models.BooleanField(verbose_name='Head Teacher', default=False)
    is_dc = models.BooleanField(
        verbose_name='Discipline Master', default=False)
    is_ac = models.BooleanField(verbose_name='Academic Master', default=False)
    is_ct = models.BooleanField(verbose_name='Class Teacher', default=False)


    def __str__(self):
        if self.is_ac == True:
            return 'Academic Master'
        elif self.is_dc == True:
            return 'Discipline Master'

        elif self.is_ct == True:
            return 'Class Teacher'

        elif self.is_ht == True:
            return 'Head Teacher'

        else:
            return ''


class GradeLevel(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return str(self.name)




class MyClass(models.Model):
    name = models.CharField('Name of class', max_length=20, unique=True)
    position = models.IntegerField(unique=True)
    level = models.ForeignKey(
        GradeLevel, on_delete=models.CASCADE, blank=True, null=True)
    class_tr = models.OneToOneField(
        Teacher, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name_plural = 'School classes'


class Pupil(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    class_applied = models.ForeignKey(
        MyClass, on_delete=models.CASCADE, related_name='class_applied', blank=True, null=True)
    class_joined = models.ForeignKey(MyClass, on_delete=models.CASCADE, related_name='class_joined', blank=True, null=True)
    birth_place = models.CharField(max_length=100)
    reasons_at_malen = models.TextField()
    myclass = models.ForeignKey(
        MyClass, on_delete=models.CASCADE, blank=True, null=True)
    status = models.CharField(max_length=20, default='active')
    motility = models.CharField(max_length=20,default='day scholar')

    def __str__(self):
        return f"{self.user.username}"

    def grade(self):
        g = int(self.class_joined.position) + (timezone.now().year - self.user.date_joined.year)
        self.myclass = MyClass.objects.get(position=g)
        self.save()


class Contact(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    relation = models.CharField(max_length=50)
    tel = models.CharField(max_length=50)
    address = models.CharField(max_length=20)
    for_emergency = models.BooleanField(blank=True, null=True)
    for_payment = models.BooleanField(blank=True, null=True)


class MedicalRecords(models.Model):
    pupil = models.OneToOneField(Pupil, on_delete=models.CASCADE)
    is_dpt = models.BooleanField(default=False)
    is_diputheria = models.BooleanField(default=False)
    is_tetanus = models.BooleanField(default=False)
    is_pertussis = models.BooleanField(default=False)
    is_pv = models.BooleanField(default=False)
    is_diabetes = models.BooleanField(default=False)
    is_epilepsy = models.BooleanField(default=False)
    is_convulsion = models.BooleanField(default=False)
    is_asthma = models.BooleanField(default=False)
    is_tb = models.BooleanField(default=False)
    is_rheumatism = models.BooleanField(default=False)
    is_eye_problems = models.BooleanField(default=False)
    is_physical_disabilities = models.BooleanField(default=False)
    medication = models.TextField()

# class Customer(models.Model):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     parent = models.ForeignKey(ChartOfAccounts, on_delete=models.CASCADE)
#     start = models.IntegerField()
#     # def debt_schoolfee(self):
#     #     pupil = SchoolFeePayment.objects.get(name_of_the_pupil=self)
#     #     debt = pupil.SchoolFeePayment__set.all().aggregate(Sum('amount'))
#     # return debt

#     # amount = models.DecimalField(max_digits=7, decimal_places=0)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.is_pupil == True:
            pupil = Pupil.objects.create(user=instance)
            MedicalRecords.objects.create(pupil=pupil)
            debtors = ChartOfAccounts.objects.get(name__iexact='debtors')
            num = debtors.children.all().count()
            ChartOfAccounts.objects.create(parent=debtors, name=instance.get_fullname(), start=(debtors.start + num + 1))

        elif instance.is_employee == True:
            employee = Employee.objects.create(user=instance)
            if instance.is_tr == True:
                Teacher.objects.create(employee=employee)


@receiver(pre_save, sender=User)
def delete_user_saved_photo(sender, instance, **kwargs):
    if instance._state.adding and not instance.pk:
        return False
    try:
        old_photo = sender.objects.get(pk=instance.pk).photo
    except sender.DoesNotExist:
        return False

    # comparing the new file with the old one
    try:
        new_photo = instance.photo
        if not old_photo == new_photo:
            if os.path.isfile(old_photo.path):
                os.remove(old_photo.path)
    except:
        return False


@receiver(post_delete, sender=User)
def delete_user(sender, instance,**kwargs):
    if instance.is_pupil == True:
        ChartOfAccounts.objects.get(name=instance.get_fullname()).delete()


class Allergy(models.Model):
    medical_records = models.ForeignKey(MedicalRecords, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)


class GuardianParticulars(models.Model):
    pupil = models.ForeignKey(Pupil, on_delete=models.CASCADE)
    relation = models.CharField(max_length=20)
    first_name = models.CharField(max_length=20)
    middle_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    village_street = models.CharField(max_length=20)
    region = models.CharField(max_length=30)
    ward = models.CharField(max_length=20)
    division = models.CharField(max_length=20)
    district = models.CharField(max_length=20)
    postal_address = models.CharField(max_length=20)
    tel_home = models.CharField(max_length=20)
    tel_office = models.CharField(max_length=20)
    mob = models.CharField(max_length=20)
    occupation = models.CharField(max_length=20)
    nationality = models.CharField(max_length=20)
    tribe = models.CharField(max_length=20)
    religion = models.CharField(max_length=20)
    denomination = models.CharField(max_length=20)


class PreviousSchool(models.Model):
    pupil = models.ForeignKey(Pupil, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    date_admitted = models.DateField(blank=True, null=True)
    date_left = models.DateField(blank=True, null=True)
    reasons = models.TextField(blank=True)
    medium = models.CharField(max_length=10, blank=True)
    is_report_attached = models.BooleanField(default=False)


class Subject(models.Model):
    name = models.CharField(max_length=20, unique=True)
    myclass = models.ManyToManyField(MyClass)

    def __str__(self):
        return self.name


class Topic(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)


class SubTopic(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)


class Teaching(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    myclass = models.ForeignKey(MyClass, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

class Task(models.Model):
    task_type = models.CharField(max_length=50)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    task = models.TextField()
    due_date = models.DateTimeField(default=timezone.now)
    is_closed = models.BooleanField(default=False)

class Calendar(models.Model):
    name = models.CharField(verbose_name='Event Name', max_length=100)
    description = models.TextField('Event Descripition')
    start_date = models.DateTimeField(
        verbose_name='Initial Date (and time) of the event')
    end_date = models.DateTimeField(
        verbose_name='Final (and time) of the event')
    color = models.CharField(verbose_name='Event Color', max_length=100)
    icon = models.CharField(verbose_name='Event Icon', max_length=100)


class TuitionFee(models.Model):
    myclass = models.ForeignKey(MyClass, on_delete=models.CASCADE)
    amount = models.IntegerField()
    pub_date = models.DateField(default=timezone.now)

    # def __str__(self):
    #     return self.amount


class AccomodationFee(models.Model):
    pub_date = models.DateField(default=timezone.now)
    amount = models.DecimalField(max_digits=7, decimal_places=0)

    def __str__(self):
        return 'Accomodation fee structure of ' + self.pub_date.year


class TransportFee(models.Model):
    year = models.CharField(max_length=4, default=timezone.now().year)
    location = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=6, decimal_places=0)

    def __str__(self):
        return 'Transport fee of ' + self.location





class SchoolGrade(models.Model):
    grade = models.CharField(max_length=20)
    benchmark = models.DecimalField(
        'the marks to which and above school grade applies', max_digits=3, decimal_places=1, )

    def __str__(self):
        return self.grade


class ExamGroupMain(models.Model):
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(default=timezone.now)
    exam_type = models.CharField(max_length=20)

    class Meta:
        unique_together = ['start_date', 'end_date', 'exam_type']

class ExamGroup(models.Model):
    exam_group_main = models.ForeignKey(ExamGroupMain, on_delete=models.CASCADE)
    myclass = models.ForeignKey(MyClass, on_delete=models.CASCADE)


class Meta:
    unique_together = [ 'myclass', 'exam_group_main']


class Exam(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    # myclass = models.ForeignKey(MyClass, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    exam_group = models.ForeignKey(ExamGroup, on_delete=models.CASCADE)
    exam_file = models.FileField(upload_to='exams')

    class Meta:
        unique_together = ['subject', 'date', 'exam_group','exam_file']


class AcademicProgress(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE,)
    pupil = models.ForeignKey(Pupil, on_delete=models.CASCADE,)
    marks = models.DecimalField(max_digits=4, decimal_places=1)

    class Meta:
        verbose_name_plural = 'Academic progress'
        unique_together = ['exam', 'pupil']


@receiver(post_save, sender=ExamGroupMain)
def create_academic_progress(sender, instance, created, **kwargs):
    if created:
        for myclass in MyClass.objects.all():
            exam_group = ExamGroup.objects.create(myclass=myclass, exam_group_main=instance)
            for subject in myclass.subject_set.all():
                exam = Exam.objects.create(subject=subject,exam_group=exam_group, date=exam_group.exam_group_main.start_date)
                for pupil in myclass.pupil_set.filter(user__is_active=True):
                    AcademicProgress.objects.create(
                        pupil=pupil, exam=exam, marks=0.0)

        # if instance.exam_type == 'Mid-Term':
        #     if timezone.now().month <= 6:
        #         examgroupmain = ExamGroupMain.objects.create(exam_type='Terminal')
        #     else:
        #         examgroupmain = ExamGroupMain.objects.create(
        #             exam_type='Annual')

        #     for myclass in MyClass.objects.all():
        #         exam_group = ExamGroup.objects.create(myclass=myclass, exam_group_main=examgroupmain)
        #         for subject in myclass.subject_set.all():
        #             exam = Exam.objects.create(subject=subject,exam_group=exam_group, date=exam_group.exam_group_main.start_date)
        #             for pupil in myclass.pupil_set.all():
        #                 AcademicProgress.objects.create(
        #                     pupil=pupil, exam=exam, marks=0.0)

class ExamQuestion(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    question = models.TextField()


class QuestionChoice(models.Model):
    qn = models.ForeignKey(ExamQuestion, on_delete=models.CASCADE)
    choice = models.CharField(max_length=100,)


class Recommendation(models.Model):
    pupil = models.ForeignKey(Pupil, on_delete=models.CASCADE)
    term = models.CharField(max_length=20)
    tag = models.CharField(max_length=20)
    date = models.DateField()
    recommendation = models.CharField(max_length=100, default='')

    class Meta:
        unique_together = ['pupil','term','tag','date']

class Attendance(models.Model):
    name = models.ForeignKey(
        Pupil, verbose_name='Name of the Pupil', on_delete=models.CASCADE)
    grade = models.ForeignKey(MyClass, on_delete=models.CASCADE)
    is_present = models.BooleanField()
    date = models.DateField(default=timezone.now)

    class Meta:
        verbose_name_plural = 'Attendance'


class LessonPlanner(models.Model):
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    myclass = models.ForeignKey(MyClass, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    start_class = models.TimeField()
    end_class = models.TimeField()
    attendance = models.ForeignKey(Attendance, on_delete=models.CASCADE)
    main_competence = models.TextField()
    specific_competence = models.TextField()
    major_activity = models.TextField()
    minor_activity = models.TextField()
    teaching_materials = models.TextField()
    reference = models.TextField()
    reflection = models.TextField()
    teaching_evaluation = models.TextField()
    Learning_evaluation = models.TextField()
    remarks = models.TextField()


class PlannerActivityStage(models.Model):
    name = models.CharField(max_length=100, verbose_name='Name of stage')


class PlannerActivityType(models.Model):
    name = models.CharField(max_length=100, verbose_name='Name of activity')


class Activity(models.Model):
    lesson_planner = models.ForeignKey(LessonPlanner, on_delete=models.CASCADE)
    activity_type = models.ForeignKey(
        PlannerActivityType, on_delete=models.CASCADE,)
    stage = models.ForeignKey(PlannerActivityStage,
                              on_delete=models.CASCADE, blank=True, null=True)
    activity = models.TextField()

    class Meta:
        verbose_name_plural = 'Planner Activities'



class Hierarchy(MPTTModel):
    name=models.CharField(max_length=255)
    parent=TreeForeignKey(
    'self', on_delete=models.CASCADE, related_name='children', null=True, blank=True)
    amount=models.IntegerField(default=0)
    def __str__(self):
        return self.name

    class MPTTModel:
        order_insertion_by=['name']

@ receiver(post_save, sender=Hierarchy)
def suming(sender, instance, created, **kwargs):
    if created:
        a=instance
        while True:
            if a.parent:
                a=a.parent
                value=a.children.all().aggregate(
                    Sum('amount'))['amount__sum']
                a.amount=value
                a.save()
            else:
                    break


class Journal(models.Model):
    class Meta:
        verbose_name_plural = 'Journal'

    date = models.DateField(default=timezone.now)
    doc_type = models.CharField(max_length=20)
    doc_no = models.CharField(max_length=20, unique=True)
    acc_type = models.CharField(blank=True, max_length=20)
    acc_no = models.ForeignKey(
        ChartOfAccounts, related_name='trancs', on_delete=models.CASCADE)
    description = models.CharField(max_length=100,)
    bal_acc_type = models.CharField(blank=True, max_length=20)
    bal_acc_no = models.ForeignKey(
        ChartOfAccounts, related_name='bal_trancs', on_delete=models.CASCADE)

    amount = models.IntegerField(default=0)
    is_posted = models.BooleanField(default=False)

class JournalExtras(models.Model):
    class Meta:
        verbose_name_plural = 'Journal Extras'
    journal = models.OneToOneField(Journal, on_delete=models.CASCADE)
    cheque_no = models.IntegerField(blank=True, null=True)



class Asset(models.Model):
    name = models.CharField(max_length=20)
    qty = models.IntegerField()
    price = models.IntegerField()


class StoreItem(models.Model):
    name = models.CharField(max_length=100)
    unit = models.CharField(max_length=10)
    qty = models.IntegerField()

    def __str__(self):
        return self.name

class StoreRecord(models.Model):
    date = models.DateField(default=timezone.now)
    item = models.ForeignKey(StoreItem, on_delete=models.CASCADE)
    qty = models.IntegerField()
    going_out = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.item.name} - {self.qty} {self.item.unit}'


@ receiver(post_save, sender=StoreRecord)
def alter_item_qty_on_create(sender, instance, created, **kwargs):
    if created:
        item_id = instance.item.id
        qty = instance.qty
        item = StoreItem.objects.get(id=item_id)
        if instance.going_out == True:
            item.qty -= qty
        else:
            item.qty += qty
        item.save()

@ receiver(post_delete, sender=StoreRecord)
def alter_item_qty_on_delete(sender, instance, **kwargs):
    item_id = instance.item.id
    qty = instance.qty
    item = StoreItem.objects.get(id=item_id)
    if instance.going_out == True:
        item.qty += qty
    else:
        item.qty -= qty
    item.save()