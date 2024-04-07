from rest_framework import serializers

from .models import SubUser, Offer,Quests


class SubUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubUser
        fields = '__all__'


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'
class QuestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quests
        fields = '__all__'
