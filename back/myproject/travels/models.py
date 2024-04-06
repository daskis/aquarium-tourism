from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.


class Locations(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField(max_length=200)
    price = models.FloatField()
    city = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    steps = models.ForeignKey('Steps',on_delete=models.CASCADE, null=True, blank=True)



class ImageLocation(models.Model):
    image_url = models.ImageField(upload_to='images/locations/', null=True, blank=True)
    image = models.ForeignKey('Locations', on_delete=models.CASCADE, to_field='id')



class Steps(models.Model):
    title = models.CharField(max_length=20)
    image = models.ImageField()
    array_interval = models.JSONField(default=dict)

    def clean(self):
        if self.array_interval and ('time_started' not in self.array_interval or 'time_ended' not in self.array_interval):
            raise ValidationError("JSON data must contain keys 'time_started' and 'time_ended'.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


