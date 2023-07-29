"""
URL configuration for murabeiapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from quickstart.urls import books_url, author_url, subject_url, user_url
from quickstart.views import LoginViewSet

urlpatterns = [
    path('login/', LoginViewSet.as_view({'post': 'create'}), name='login'),
    path('admin/', admin.site.urls),
    path('book/', include(books_url)),
    path('author/', include(author_url)),
    path('subject/', include(subject_url)),
    path('user/', include(user_url)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
