from django.urls import include, path
from rest_framework import routers
from quickstart.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]