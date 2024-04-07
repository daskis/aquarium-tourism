from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register('subusers', SubUserViewSet, 'subuser')
router.register('offers', OfferViewSet, 'offer')
router.register('quests', QuestsViewSet, 'quest')

urlpatterns = [
    path('', include(router.urls), name="subuser"),
]

# path('register/', RegisterView.as_view(), name='register'),
