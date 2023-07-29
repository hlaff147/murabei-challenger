from django.test import TestCase
from rest_framework import status

from quickstart.models import Author, Book, Subjects, User
from rest_framework.test import APIClient
from django.urls import reverse


# Create your tests here.
class AuthorModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Author.objects.create(name='Test Author', email='author@test.com', age=35)

    def test_name_label(self):
        author = Author.objects.get(id=1)
        field_label = author._meta.get_field('name').verbose_name
        print(f'Nome do autor: {field_label}')
        self.assertEquals(field_label, 'name')

    def test_email_label(self):
        author = Author.objects.get(id=1)
        field_label = author._meta.get_field('email').verbose_name
        print(f'Email do autor: {field_label}')
        self.assertEquals(field_label, 'email')

    def test_age_label(self):
        author = Author.objects.get(id=1)
        field_label = author._meta.get_field('age').verbose_name
        print(f'Idade do autor: {field_label}')
        self.assertEquals(field_label, 'age')


class BookModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        author = Author.objects.create(name='Test Author', email='author@test.com', age=35)
        Book.objects.create(name='Test Book', author=author)

    def test_name_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('name').verbose_name
        print(f'Nome do livro: {field_label}')
        self.assertEquals(field_label, 'name')

    def test_author_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('author').verbose_name
        print(f'Autor do livro: {field_label}')
        self.assertEquals(field_label, 'author')


class SubjectModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Subjects.objects.create(description='Test Subject')

    def test_description_label(self):
        subject = Subjects.objects.get(id=1)
        field_label = subject._meta.get_field('description').verbose_name
        print(f'Descrição do assunto: {field_label}')
        self.assertEquals(field_label, 'description')


class UserModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(email='testemail1@test.com', cpf='12345678900', password='testpass123')
        User.objects.create_user(email='testemail2@test.com', cpf='23456789012', password='testpass456')

    def test_user_creation(self):
        user1 = User.objects.get(id=1)
        print(f'Email do usuário1: {user1.email}, CPF: {user1.cpf}, Senha correta: {user1.check_password("testpass123")}')
        self.assertEquals(user1.email, 'testemail1@test.com')
        self.assertEquals(user1.cpf, '12345678900')
        self.assertTrue(user1.check_password('testpass123'))

        user2 = User.objects.get(id=2)
        print(f'Email do usuário2: {user2.email}, CPF: {user2.cpf}, Senha correta: {user2.check_password("testpass456")}')
        self.assertEquals(user2.email, 'testemail2@test.com')
        self.assertEquals(user2.cpf, '23456789012')
        self.assertTrue(user2.check_password('testpass456'))

    def test_user_count(self):
        print(f'Número total de usuários: {User.objects.count()}')
        self.assertEquals(User.objects.count(), 2)

    def test_invalid_password(self):
        user1 = User.objects.get(id=1)
        print(f'Senha inválida para o usuário1: {user1.check_password("wrongpass")}')
        self.assertFalse(user1.check_password('wrongpass'))

    def test_str_representation(self):
        user1 = User.objects.get(id=1)
        expected_str_representation = user1.email
        print(f'Representação em string do usuário1: {str(user1)}')
        self.assertEquals(str(user1), expected_str_representation)


# Testes para a view de Login
class LoginViewTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(email='testuser@test.com', cpf='12345678900', password='testpass123')

    def setUp(self):
        self.client = APIClient()

    def test_user_can_login_with_correct_credentials(self):
        response = self.client.post(reverse('login'), {'email': 'testuser@test.com', 'password': 'testpass123'})
        print(f"Status de resposta ao tentar fazer login com credenciais corretas: {response.status_code}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_login_with_incorrect_credentials(self):
        response = self.client.post(reverse('login'), {'email': 'wronguser@test.com', 'password': 'wrongpass'})
        print(f"Status de resposta ao tentar fazer login com credenciais incorretas: {response.status_code}")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

