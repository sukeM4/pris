# Generated by Django 3.1.1 on 2020-11-12 22:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0017_remove_previousschool_level'),
    ]

    operations = [
        migrations.RenameField(
            model_name='allergy',
            old_name='allergy',
            new_name='name',
        ),
    ]
