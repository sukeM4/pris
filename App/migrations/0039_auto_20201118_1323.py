# Generated by Django 3.1.1 on 2020-11-18 10:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0038_delete_customer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoice',
            name='customer',
        ),
        migrations.RemoveField(
            model_name='schoolfeescashbook',
            name='pupil',
        ),
        migrations.RemoveField(
            model_name='transportfeescashbook',
            name='pupil',
        ),
        migrations.DeleteModel(
            name='CashBook',
        ),
        migrations.DeleteModel(
            name='Invoice',
        ),
        migrations.DeleteModel(
            name='SchoolFeesCashBook',
        ),
        migrations.DeleteModel(
            name='TransportFeesCashBook',
        ),
    ]
