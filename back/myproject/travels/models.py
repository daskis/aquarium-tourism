from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.


class Location(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField(max_length=200)
    price = models.FloatField()
    city = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    steps = models.ForeignKey('Steps',on_delete=models.CASCADE, default=None)



class ImageModel(models.Model):
    image_url = models.ImageField(upload_to='avatars/', null=True, blank=True)
    image = models.ForeignKey('Location', on_delete=models.CASCADE)



class Steps(models.Model):
    title = models.CharField(max_length=20)
    image = models.ImageField()
    array_interval = models.JSONField()

    def clean(self):
        if self.array_interval and ('time_started' not in self.array_interval or 'time_ended' not in self.json_data):
            raise ValidationError("JSON data must contain keys 'key1' and 'key2'.")

    def save(self, *args, **kwargs):
        self.full_clean()  # Вызываем метод clean перед сохранением
        super().save(*args, **kwargs)


