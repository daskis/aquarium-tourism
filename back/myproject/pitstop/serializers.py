from rest_framework import serializers
from .models import Pitstop

class PitstopSerizlizer(serializers.ModelSerializer):
    class Meta:
        model=Pitstop
        fields = '__all__'
