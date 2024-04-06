from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Pitstop
from .serializers import PitstopSerizlizer


class PitstopViewSet(ModelViewSet):
    queryset = Pitstop.objects.all()
    serializer_class = PitstopSerizlizer




# Create your views here.
