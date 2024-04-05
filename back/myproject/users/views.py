from datetime import datetime

from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializer import UserRegisterSerializer, LoginSerializer, UserHeaderSerializer, RegistrationConfirmView, \
    UpdateTokensSerializer
from .models import User, OneTimePassword
from .utils import send_generated_otp_to_email


class RegisterSendOTPView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data = serializer.data
            send_generated_otp_to_email(user_data['email'], request)

            return Response({
                'data': user_data,
                'message': 'waiting otp verify'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        user = User.objects.get(pk=pk)
        serializer = self.serializer_class(instance=user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save(raise_exception=True)
            user_data = serializer.data

            return Response({
                'data': user_data,
                'message': 'waiting otp verify'
            }, status=status.HTTP_200_OK)
        return Response({
            'data': serializer.errors,
            'message': 'waiting otp verify'
        }, status=status.HTTP_400_BAD_REQUEST)


class SetDataToUser(APIView):


    def put(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        instance = User.objects.get(pk=pk)
        serializer = UserRegisterSerializer(instance=instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data = serializer.data

            return Response({
                'data': user_data,
                'message': 'waiting otp verify'
            }, status=status.HTTP_200_OK)
        return Response({
            'data': serializer.errors,
            'message': 'waiting otp verify'
        }, status=status.HTTP_400_BAD_REQUEST)


class RegisterConfirmView(GenericAPIView):
    serializer_class = RegistrationConfirmView

    def post(self, request, commit=False):
        try:
            passcode = request.data
            user_pass_obj = OneTimePassword.objects.filter(email=request.data.get('email')).first()
            serializer = self.serializer_class(data=passcode)

            if serializer.is_valid(raise_exception=True) and serializer.data['otp'] == user_pass_obj.otp:
                user = User.objects.filter(email=request.data.get('email')).update(is_active=True)

                user_pass_obj.delete()

                return Response({
                    # 'data': user_data,
                    'message': 'thanks for signing up, start creating'
                }, status=status.HTTP_200_OK)
            return Response({
                'messege''otp uncorrect'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateTokens(GenericAPIView):
    serializer_class = UpdateTokensSerializer

    def post(self, request):
        refresh_token = request.data

        user = User.objects.filter(refresh_token=refresh_token['refresh_token'])
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)


class ResetPassword:
    pass


class TestAuthView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {'it': 'works'}
        return Response(data, status=status.HTTP_200_OK)

# Create your views here.
