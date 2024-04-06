from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LocationViewSet, ImageLocationViewSet, StepsViewSet

router = DefaultRouter()
router.register('location', LocationViewSet, basename='location')
router.register('image', ImageLocationViewSet, basename='image')
router.register('step', StepsViewSet, basename='step')
print(router.urls)
urlpatterns = [
    path('locations/',include(router.urls)),
    # path('uploadimages/',include(router.urls))
]