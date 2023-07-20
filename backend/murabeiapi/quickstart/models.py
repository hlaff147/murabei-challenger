from django.db import models


# Create your models here.
class Author(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    age = models.IntegerField()


class Subjects(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=500)


class Book(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subjects)
