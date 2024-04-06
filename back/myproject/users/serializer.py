from datetime import datetime
from types import NoneType

from rest_framework import serializers
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, OneTimePassword
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True)
    avatar = serializers.ImageField(use_url=True, required=False)

    def validate(self, attrs):
        password = attrs.get('password', '')
        password2 = attrs.get('password2', '')
        if password != password2:
            raise serializers.ValidationError("passwords do not match")

        return attrs

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2', 'avatar']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data.get('username'),
            password=validated_data.get('password')
        )
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.avatar = validated_data.get("avatar", instance.avatar)
        instance.set_password(validated_data.get("password", instance.password))
        instance.save()
        return instance




class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=155, min_length=6,write_only=True)
    password = serializers.CharField(max_length=68, write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'access_token','refresh_token']

    def validate(self, attrs):
        username = attrs.get('username', None)
        password = attrs.get('password', None)
        request = self.context.get('request')
        user = authenticate(request, username=username, password=password)

        if not user:
            raise AuthenticationFailed("invalid")
        if not user.is_active:
            raise AuthenticationFailed("unactive")
        user_token = user.tokens()


        return {
            'access_token': str(user_token.get('access')),
            'refresh_token': str(user_token.get('refresh')),
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
        fields = ['refresh_token', 'access_token']

    def validate(self, attrs):

        request = self.context.get('request')
        token = request.data['refresh_token']
        try:
            # now = datetime.utcnow()
            # if refresh_token.payload['exp'] < now.timestamp():
            #     AuthenticationFailed("Refresh token истек")
            refresh_token = RefreshToken(token)
            user = User.objects.filter(refresh_token=refresh_token).first()
        except TokenError as token_err:
            raise serializers.ValidationError({"refresh_token":str(token_err)})
        except Exception as err:
            return serializers.ValidationError({"Error":str(err)})
        user_token = user.tokens()

        user_token.get('refresh')

        return {
            'refresh_token': str(user_token.get('refresh')),
            'access_token': str(user_token.get('access')),
        }
