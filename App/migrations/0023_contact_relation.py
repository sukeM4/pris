# Generated by Django 3.1.1 on 2020-11-12 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0022_auto_20201113_0221'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='relation',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]