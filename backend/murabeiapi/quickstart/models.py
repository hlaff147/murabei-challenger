from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.
class Author(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    age = models.IntegerField()


class Subjects(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=500, unique=True)


class Book(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subjects)


class MyUserManager(BaseUserManager):
    def create_user(self, email, cpf, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not cpf:
            raise ValueError("Users must have a CPF")

        user = self.model(
            email=self.normalize_email(email),
            cpf=cpf,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, cpf, password=None):
        user = self.create_user(
            email,
            password=password,
            cpf=cpf,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    cpf = models.CharField(max_length=14, unique=True)
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['cpf']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
