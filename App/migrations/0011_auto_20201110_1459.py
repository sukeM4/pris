# Generated by Django 3.1.1 on 2020-11-10 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0010_auto_20201110_1255'),
    ]

    operations = [
        migrations.AddField(
            model_name='pupil',
            name='motility',
            field=models.CharField(default='day scholar', max_length=20),
        ),
        migrations.AlterField(
            model_name='pupil',
            name='status',
            field=models.CharField(default='active', max_length=20),
        ),
    ]
