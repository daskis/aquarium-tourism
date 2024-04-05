from datetime import datetime

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, OneTimePassword
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True)



    class Meta:
        model = User
        fields = ['email', 'username', 'password', ]

    def validate(self, attrs):
        password = attrs.get('password', '')
        password2 = attrs.get('password2', '')
        if password != password2:
            raise serializers.ValidationError("passwords do not match")

        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data.get('username'),
            password=validated_data.get('password')
        )
        return user
    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("username", instance.emal)
        instance.password = validated_data.get("username", instance.password)
        instance.save()
        print(instance)
        return instance

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=155, min_length=6)
    password=serializers.CharField(max_length=68, write_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['username','password','access_token','refresh_token']

    def validate(self, attrs):
        username = attrs.get('username', None)
        password = attrs.get('password', None)
        request = self.context.get('request')
        user = authenticate(request,username=username,password=password)
        if not user:
            raise AuthenticationFailed("invalid")
        if not user.is_active:
            raise AuthenticationFailed("unactive")
        user_token = user.tokens()

        return{
            'username':user.username,
            'access_token':str(user_token.get('access')),
            'refresh_token':str(user_token.get('refresh')),
            }

class UserHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']


class RegistrationConfirmView(serializers.ModelSerializer):
    class Meta:
        model = OneTimePassword
        fields = ['email', 'otp']


class UpdateTokensSerializer(serializers.ModelSerializer):
    refresh_token = serializers.CharField(max_length=255)
    access_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['refresh_token','access_token']

    def validate(self, attrs):
        request = self.context.get('request')
        token = request.data['refresh_token']
        refresh_token = RefreshToken(token)
        now = datetime.utcnow()
        if refresh_token.payload['exp'] < now.timestamp():
            AuthenticationFailed("Refresh token истек")
        user = User.objects.filter(refresh_token=refresh_token).first()
        user_token = user.tokens()

        return {
            'access_token': str(user_token.get('access')),
            'refresh_token': str(user_token.get('refresh')),
        }



