# Generated by Django 5.0.4 on 2024-04-07 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travels', '0016_alter_facility_locations'),
    ]

    operations = [
        migrations.AddField(
            model_name='facility',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='facility',
            name='type_facility',
            field=models.CharField(choices=[('pitstop', 'PITSTOP'), ('hub', 'HUB'), ('resort', 'RESORT')], max_length=20),
        ),
    ]
