# Generated by Django 5.0.4 on 2024-04-06 11:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travels', '0006_rename_location_locations'),
    ]

    operations = [
        migrations.AlterField(
            model_name='steps',
            name='array_interval',
            field=models.JSONField(default=dict),
        ),
    ]
