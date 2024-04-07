from django.core.exceptions import ValidationError
from django.db import models
from users.models import *


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
TYPES_FOR_FACILITIES = {
    "pitstop": "PITSTOP",
    "hub": "HUB",
    "resort": "RESORT"
}


class Facility(models.Model):
    type_facility = models.CharField(max_length=20, choices=TYPES_FOR_FACILITIES)
    owner = models.ForeignKey('users.User', on_delete=models.RESTRICT, default=None, null=True)

    square = models.FloatField(max_length=20, verbose_name='Площадь')
    MFZ = models.CharField(max_length=20, verbose_name="МФЗ")
    cafe = models.IntegerField(verbose_name='Места для приготовления пищи')
    distribution_center = models.CharField(max_length=50, verbose_name='Центр распределения')
    STO = models.CharField(max_length=50, verbose_name='Станция тех. обслуживания')
    power_charging = models.IntegerField(verbose_name='Электро зарядки')
    market = models.CharField(max_length=20, verbose_name="Рынок")
    tilt = models.CharField(max_length=20, verbose_name="Тент")
    shower = models.IntegerField(verbose_name='Душ')
    buildings = models.IntegerField(verbose_name='Модульные дома')
    pitch = models.IntegerField(verbose_name="Питч-обычный")
    pitch_vip = models.IntegerField(verbose_name="Питч-ВИП")
    capacity = models.IntegerField(verbose_name="Вместимость")
    employee_number = models.IntegerField(verbose_name="Количество вакансий")


    def clean(self):
        type = "PITSTOP"

        a = [self.square > 1,self.cafe > 50,self.power_charging > 2,self.shower > 10,self.buildings > 7, self.pitch > 20,self.pitch_vip > 10,self.capacity > 74, self.employee_number > 22]
        # if self.square >= 1 or self.cafe > 50 or self.power_charging > 2 or self.shower > 10 or self.buildings > 7 or self.pitch > 20 or self.pitch_vip > 10 or self.capacity > 74 or self.employee_number > 22:
        #     pass
        for i in a:
            if i == True:
                type = "HUB"
                break

        a = [self.square > 3,self.power_charging > 4,self.shower > 20,self.buildings > 12, self.pitch > 30,self.pitch_vip > 20,self.capacity > 124, self.employee_number > 33]
        for i in a:
            if i == True:
                type = "RESORT"
                return type
        return type
    def full_clean(self, exclude=None, validate_unique=True, validate_constraints=True):
        super(Facility,self).full_clean()
        return self.clean()

    def save(self, *args, **kwargs):
        self.type_facility = self.full_clean()
        super().save(*args, **kwargs)





class Locations(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField(max_length=200)
    price = models.FloatField()
    city = models.CharField(max_length=20)
    status = models.CharField(choices=STATUS_FOR_LOCATIONS, max_length=10, default="NOT_ACTIVE")
    in_favorites = models.BooleanField(default=False)


class ImageLocation(models.Model):
    image_url = models.ImageField(upload_to='images/locations/', null=True, blank=True)
    image = models.ForeignKey('Locations', on_delete=models.CASCADE, to_field='id', null=True)


class Steps(models.Model):
    title = models.CharField(max_length=20)
    image = models.ImageField(upload_to='images/steps', null=True, blank=True)
    array_interval = models.JSONField(default=dict)
    coordinates = models.JSONField(default=dict)
    status = models.CharField(choices=STATUS_FOR_STEPS, max_length=10, default="NOT_ACTIVE")
    location = models.ForeignKey('Locations', on_delete=models.CASCADE, null=False, blank=False)

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

# {"latitude":50,"longitude":123}
# {"time_started":"123","time_ended":"123"}
