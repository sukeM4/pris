# Generated by Django 3.1.1 on 2020-11-19 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0039_auto_20201118_1323'),
    ]

    operations = [
        migrations.AlterField(
            model_name='previousschool',
            name='date_admitted',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='previousschool',
            name='date_left',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='previousschool',
            name='medium',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='previousschool',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='previousschool',
            name='reasons',
            field=models.TextField(blank=True),
        ),
    ]
