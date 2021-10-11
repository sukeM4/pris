from django.contrib.auth import get_user_model
from .models import Pupil, Employee, Calendar, MyClass, GradeLevel, Subject, Teacher, ChartOfAccounts, Task

User = get_user_model()


def add_context_processors_var(request):
    pupils = Pupil.objects.filter(user__is_active=True)
    cals = Calendar.objects.all()
    class_list = MyClass.objects.all().order_by('position')
    grade_levels = GradeLevel.objects.all()
    employees = Employee.objects.all()
    subject_list = Subject.objects.all()
    teacher_list = Teacher.objects.all()
    chartofaccs = ChartOfAccounts.objects.all()
    tasks = Task.objects.all()
    context = {'cal': cals, 'pupils': pupils, 'employees': employees,
               'class_list': class_list, 'grade_levels': grade_levels, 'subject_list': subject_list, 'teacher_list': teacher_list, 'totals': chartofaccs, 'tasks': tasks}
    return context
