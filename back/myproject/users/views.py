from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserRegisterSerializer, LoginSerializer, \
    UpdateTokensSerializer
from .models import User

class RegisterSendOTPView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    authentication_classes = []

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data = serializer.data

            # send_generated_otp_to_email(user_data['email'], request)
            return Response({
                'data': user_data,
                'message': 'waiting otp verify'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SetDataToUser(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        instance = User.objects.get(pk=pk)
        serializer = UserRegisterSerializer(instance=instance)
        return(Response({
                'data': serializer.data,
                'message': 'waiting otp verify'
            }, status=status.HTTP_200_OK)
)
    def put(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        instance = User.objects.get(pk=pk)
        print(instance)
        serializer = UserRegisterSerializer(instance=instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'data': serializer.data,
                'message': 'waiting otp verify'
            }, status=status.HTTP_200_OK)

        return Response({
            'data': serializer.errors,
            'message': 'waiting otp verify'
        }, status=status.HTTP_400_BAD_REQUEST)

"""на случай аутентификации через почту"""
# class RegisterConfirmView(GenericAPIView):
#     serializer_class = RegistrationConfirmView
#
#     def post(self, request, commit=False):
#         try:
#             passcode = request.data
#             user_pass_obj = OneTimePassword.objects.filter(email=request.data.get('email')).first()
#             serializer = self.serializer_class(data=passcode)
#             if serializer.is_valid(raise_exception=True) and serializer.data['otp'] == user_pass_obj.otp:
#                 user = User.objects.filter(email=request.data.get('email')).update(is_active=True)
#                 user_pass_obj.delete()
#
#                 return Response({
#                     # 'data': user_data,
#                     'message': 'thanks for signing up, start creating'
#                 }, status=status.HTTP_200_OK)
#             return Response({
#                 'messege''otp uncorrect'
#             }, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             print(e)
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer
    authentication_classes = []


    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        resp = Response({"access_token":serializer.data['access_token']}, status=status.HTTP_200_OK)
        resp.set_cookie('refresh_token',serializer.data['refresh_token'], path='', httponly=True)
        return resp

class UpdateTokens(GenericAPIView):
    serializer_class = UpdateTokensSerializer
    permission_classes = [AllowAny,]
    authentication_classes = []

    def get(self, request):
        print(request.COOKIES)
        refresh_token = request.COOKIES['refresh_token']



        serializer = self.serializer_class(data=request.COOKIES, context={'refresh_token': refresh_token})
        serializer.is_valid(raise_exception=True)
        #print(serializer.data['refresh_token'])
        resp = Response({"access_token": serializer.data['access_token']}, status=status.HTTP_200_OK)
        resp.set_cookie('refresh_token', serializer.data['refresh_token'],path='', httponly=True)
        return resp




class TestAuthView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {'it': 'works'}
        return Response(data, status=status.HTTP_200_OK)

# Create your views here.
