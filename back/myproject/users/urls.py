
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()


urlpatterns = [
    path('register/', RegisterSendOTPView.as_view(), name='register'),
    path('update/<int:pk>', SetDataToUser.as_view(), name='user_partial_update'),
    #path('register/confirm/', RegisterConfirmView.as_view(), name='register-confirm'),
    path('login/', LoginUserView.as_view(), name='login'),
    #path('somewhat/dont_attract', TestAuthView.as_view(), name='some'),
    path('token/refresh/', UpdateTokens.as_view(), name='token_refresh'),
    path('user/me/', UserMe.as_view(),name="userme"),
]




#path('register/', RegisterView.as_view(), name='register'),