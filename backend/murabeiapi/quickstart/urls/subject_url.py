# book_urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from quickstart.views import SubjectsViewSet

router = DefaultRouter()
router.register(r'', SubjectsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]