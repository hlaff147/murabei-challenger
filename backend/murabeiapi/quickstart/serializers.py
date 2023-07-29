# serializers.py
from rest_framework import serializers
from .models import Book, Author, Subjects, User


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'name', 'author', 'subjects']
        extra_kwargs = {
            'name': {'required': True},
            'author': {'required': True},
            'subjects': {'required': True},
        }

    def to_representation(self, instance):
        self.fields['author'] = AuthorSerializer(read_only=True)
        self.fields['subjects'] = SubjectsSerializer(many=True, read_only=True)
        return super(BookSerializer, self).to_representation(instance)


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'email', 'age']
        extra_kwargs = {
            'name': {'required': True},
            'email': {'required': True},
            'age': {'required': True},
        }


class SubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = ['id', 'description']
        extra_kwargs = {
            'description': {'required': True},
        }


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'name', 'email', 'cpf', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
