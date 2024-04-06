from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Locations, ImageLocation, Steps
from .serializers import LocationsSerializer, ImageLocationSerializer, StepsSerializers
class LocationViewSet(ModelViewSet):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer


class ImageLocationViewSet(ModelViewSet):
    queryset = ImageLocation.objects.all()
    serializer_class = ImageLocationSerializer




class StepsViewSet(ModelViewSet):
    queryset = Steps.objects.all()
    serializer_class = StepsSerializers



# Create your views here.
