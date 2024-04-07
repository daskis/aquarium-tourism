from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Locations, ImageLocation, Steps, Facility
from .serializers import LocationsSerializer, ImageLocationSerializer, StepsSerializer, FacilitySerializer


class LocationViewSet(ModelViewSet):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer


class ImageLocationViewSet(ModelViewSet):
    queryset = ImageLocation.objects.all()
    serializer_class = ImageLocationSerializer

    @action(methods=["GET"],detail=True)
    def retrive(self, request, pk):
        print(pk)
        queryset = ImageLocation.objects.values().filter(location=pk)
        return Response(queryset)




class StepsViewSet(ModelViewSet):
    queryset = Steps.objects.all()
    serializer_class = StepsSerializer


    @action(methods=["GET"],detail=True)
    def retrive(self, request, pk):
        print(pk)
        queryset = Steps.objects.values().filter(location=pk)
        return Response(queryset)

class FacilityViewSet(ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer



# Create your views here.
