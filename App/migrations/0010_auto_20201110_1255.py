# Generated by Django 3.1.1 on 2020-11-10 09:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0009_auto_20201109_1702'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='academicprogress',
            unique_together={('exam', 'pupil')},
        ),
    ]