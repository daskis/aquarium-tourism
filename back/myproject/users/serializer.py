from rest_framework import serializers
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, OneTimePassword
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    repeatPassword = serializers.CharField(max_length=68, min_length=6, write_only=True)
    avatar = serializers.ImageField(use_url=True, required=False)

    def validate(self, attrs):
        password = attrs.get('password', '')
        repeatPassword = attrs.get('repeatPassword', '')
        if password != repeatPassword:
            raise serializers.ValidationError("passwords do not match")
        return attrs

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'repeatPassword', 'avatar']

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
        print(RefreshToken(user_token.get('refresh')))

        return {
            'access_token': str(user_token.get('access')),
            'refresh_token': str(user_token.get('refresh')),
        }
class UserHeaderSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, )
    email = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'avatar']


class RegistrationConfirmView(serializers.ModelSerializer):
    class Meta:
        model = OneTimePassword
        fields = ['email', 'otp']


class UpdateTokensSerializer(serializers.ModelSerializer):
    refresh_token = serializers.CharField(max_length=255,read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['refresh_token', 'access_token']

    def validate(self, attrs):

        refresh_token = self.context.get('refresh_token')
        user = User.objects.filter(refresh_token=refresh_token).first()
        if user is None:
            raise TokenError
        refresh_token = RefreshToken(refresh_token)

        user_token = user.tokens()

        user_token.get('refresh')
        print("123",str(user_token.get('refresh')))

        return {
            'refresh_token': str(user_token.get('refresh')),
            'access_token': str(user_token.get('access')),
        }
