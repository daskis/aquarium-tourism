from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet

from .models import SubUser, Offer, Quests
from .serializers import SubUserSerializer, OfferSerializer, QuestsSerializer


class SubUserViewSet(ModelViewSet):
    queryset = SubUser.objects.all()
    serializer_class = SubUserSerializer

    @action(methods=["GET"], detail=True)
    def retrive(self, request, pk):
        queryset = SubUser.objects.filter(user_id=pk).values()
        return Response(queryset)


class OfferViewSet(ModelViewSet):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer


class QuestsViewSet(ModelViewSet):
    queryset = Quests.objects.all()
    serializer_class = QuestsSerializer


# Create your views here.
