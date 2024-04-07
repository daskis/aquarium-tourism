# Generated by Django 5.0.4 on 2024-04-06 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubUser',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100)),
                ('user_class', models.CharField(max_length=100)),
                ('image_path', models.CharField(max_length=100)),
                ('speed', models.IntegerField(default=1)),
                ('cunning', models.IntegerField(default=1)),
                ('luck', models.IntegerField(default=1)),
            ],
        ),
    ]