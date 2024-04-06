from django.urls import path, include
from rest_framework.routers import SimpleRouter, DefaultRouter
from .views import PitstopViewSet
router = SimpleRouter()
router.register('pitstop', PitstopViewSet, basename='pitstop')
print(router)
urlpatterns = [
    path('some/',include(router.urls))
]