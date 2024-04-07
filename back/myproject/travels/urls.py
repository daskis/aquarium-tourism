from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LocationViewSet, ImageLocationViewSet, StepsViewSet,FacilityViewSet

router = DefaultRouter()
router.register('locations', LocationViewSet, basename='locations')
router.register('image', ImageLocationViewSet, basename='image')
router.register('step', StepsViewSet, basename='step')
router.register('step', StepsViewSet, basename='step-detail')
router.register('facility', FacilityViewSet, basename='facility')
print(router.urls)
urlpatterns = [
    path('',include(router.urls)),
    path('',include(router.urls)),
    # path('uploadimages/',include(router.urls))
]