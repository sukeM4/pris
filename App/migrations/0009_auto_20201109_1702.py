# Generated by Django 3.1.1 on 2020-11-09 14:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0008_auto_20201109_1621'),
    ]

    operations = [
        migrations.RenameField(
            model_name='examgroup',
            old_name='examgroupmain',
            new_name='exam_group_main',
        ),
    ]
