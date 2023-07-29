from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from .models import Book, Author, Subjects, User
from .serializers import BookSerializer, AuthorSerializer, SubjectsSerializer, UserSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import status
from rest_framework import mixins
from django.contrib.auth.hashers import check_password



class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class SubjectsViewSet(viewsets.ModelViewSet):
    queryset = Subjects.objects.all()
    serializer_class = SubjectsSerializer


class UserViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)
        else:
            self.permission_classes = (IsAdminUser,)

        return super(UserViewSet, self).get_permissions()

    def create(self, request, *args, **kwargs):
        try:
            email = request.data["email"]
            cpf = request.data["cpf"]
            password = request.data["password"]
            User.objects.create_user(email=email, cpf=cpf, password=password)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": "Could not create user due to {}".format(e)},
                            status=status.HTTP_400_BAD_REQUEST)
class LoginViewSet(viewsets.ViewSet):
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            if user and check_password(serializer.validated_data['password'], user.password):
                return Response({'message': 'Successful login.'}, status=status.HTTP_200_OK)
            else:
                raise User.DoesNotExist
        except User.DoesNotExist:
            return Response({'message': 'Invalid login credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
