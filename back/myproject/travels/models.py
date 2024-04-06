from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.
STATUS_FOR_LOCATIONS = {
    "done": "DONE",
    "not_active": "NOT_ACTIVE",
    "pending": "PENDING"
}
STATUS_FOR_STEPS = {
    "done": "DONE",
    "not_active": "NOT_ACTIVE",
    "pending": "PENDING"

}


class Locations(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField(max_length=200)
    price = models.FloatField()
    city = models.CharField(max_length=20)
    status = models.CharField(choices=STATUS_FOR_LOCATIONS, max_length=10, default="NOT_ACTIVE")
    steps = models.ForeignKey('Steps', on_delete=models.CASCADE, null=True, blank=True)


class ImageLocation(models.Model):
    image_url = models.ImageField(upload_to='images/locations/', null=True, blank=True)
    image = models.ForeignKey('Locations', on_delete=models.CASCADE, to_field='id')


class Steps(models.Model):
    title = models.CharField(max_length=20)
    image = models.ImageField(upload_to='images/steps',null=True, blank=True)
    array_interval = models.JSONField(default=dict)
    coordinates = models.JSONField(default=dict)
    status = models.CharField(choices=STATUS_FOR_STEPS, max_length=10, default="NOT_ACTIVE")

    def clean(self):
        if self.array_interval and (
                'time_started' not in self.array_interval or 'time_ended' not in self.array_interval):
            raise ValidationError("JSON data must contain keys 'time_started' and 'time_ended'.")
        if self.array_interval and (
                'latitude' not in self.coordinates or 'longitude' not in self.coordinates):
            raise ValidationError("JSON data must contain keys 'latitude' and 'longitude'.")
        print(self.coordinates['latitude'])
        if not (-90 < self.coordinates['latitude'] < 90):
            raise ValidationError("out if range for 'latitude'")
        if not (-180 < self.coordinates['longitude'] < 180):
            raise ValidationError("out if range for 'longitude'")


    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
