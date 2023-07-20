# book_urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from quickstart.views import BookViewSet

router = DefaultRouter()
router.register(r'', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
]