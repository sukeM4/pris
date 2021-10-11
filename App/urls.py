from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('assets/', views.assets, name='assets'),
    path('calendar/', views.calendar, name='calendar'),
    path('cash-book/', views.cash_book, name='cash-book'),
    path('change-password/', views.change_password, name='change-password'),
    path('chart-of-accs/', views.chart_of_accs, name='chart-of-accs'),
    path('class/<my_class>', views.my_class, name='my-class'),
    path('exam-group-main-list/', views.exam_group_main_list, name='exam-group-main-list'),
    path('exam-group-list/<id>', views.exam_group_list, name='exam-group-list'),
    path('exam-list/<id>', views.exam_list, name='exam-list'),
    path('exam-list-report-pdf/<id>', views.exam_list_report_pdf, name='exam-list-report-pdf'),
    path('exam-report/<id>', views.exam_report, name='exam-report'),
    path('load-subjects/', views.load_subjects, name='load-subjects'),
    path('load-exam-report/', views.load_exam_report, name='load-exam-report'),
    path('load-class-exam-report/', views.load_class_exam_report, name='load-class-exam-report'),
    path('load-doc-no/', views.load_doc_no, name='load-doc-no'),
    path('load-acc-no/', views.load_acc_no, name='load-acc-no'),
    path('exam-create/<id>', views.exam_create, name='exam-create'),
    path('grade-book/', views.grade_book, name='grade-book'),
    path('index/', views.index, name='index'),
    path('index2/', views.index2, name='index2'),
    path('invoice/', views.invoice, name='invoice'),
    path('journal/<str:journal_type>', views.journal, name='journal'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('list-employees/', views.list_employees, name='list-employees'),
    path('list-pupil/', views.list_pupils, name='list-pupil'),
    path('profile/<str:username>', views.profile, name='profile'),
    path('register/', views.register, name='register'),
    path('register-employee/', views.register_employee, name='register-employee'),
    path('register-pupil/', views.register_pupil, name='register-pupil'),
    path('report-card/', views.report_card, name='report-card'),
    path('report-card-pdf/<year>/<myclass>/<term>/',
         views.report_card_pdf, name='report-card-pdf'),
    path('customer', views.customer, name='customer'),
    path('setup/', views.setup, name='setup'),
    path('store-records/', views.store_records, name='store_records'),
    path('store-records-data/', views.store_records_data, name='store_records_data'),
    path('<statement_type>/statement/', views.statement, name='statement'),
]
