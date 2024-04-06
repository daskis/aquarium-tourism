from django.db import models
#from django.contrib.gis.db import models as md


class Pitstop(models.Model):
    title = models.CharField(max_length=50, unique=True)
    area = models.FloatField(max_length=1) #1 потому что макс 1 гектар
    # coordinates = md.PointField(max_length=180,default=(1,1))
    # MFZ = None
    # distribution_area = models.IntegerField()
    # cafe = None #здесь нужно бахнуть чтото поле?
    # parking = models.IntegerField(default=25)
    # charger = models.IntegerField()
    # market = models.IntegerField()
    # child_area = models.IntegerField()
    # quantity = models.IntegerField()



# Create your models here.
