# Generated by Django 5.0.4 on 2024-04-06 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travels', '0003_alter_steps_array_interval'),
    ]

    operations = [
        migrations.AlterField(
            model_name='steps',
            name='array_interval',
            field=models.JSONField(default={'time_ended': '1', 'time_started': '0'}),
        ),
    ]
