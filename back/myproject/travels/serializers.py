from rest_framework import serializers
from .models import *


class LocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locations
        fields = '__all__'


class ImageLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageLocation
        fields = '__all__'


class StepsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Steps
        fields = '__all__'


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'