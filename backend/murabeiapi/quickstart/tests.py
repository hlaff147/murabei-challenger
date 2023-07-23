from django.test import TestCase

from quickstart.models import Author, Book, Subjects


# Create your tests here.
class AuthorModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Author.objects.create(name='Test Author', email='author@test.com', age=35)

    def test_name_label(self):
        author = Author.objects.get(id=1)
        field_label = author._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_email_label(self):
        author = Author.objects.get(id=1)
        field_label = author._meta.get_field('email').verbose_name
        self.assertEquals(field_label, 'email')

    def test_age_label(self):
        author = Author.objects.get(id=1)
        field_label = author._meta.get_field('age').verbose_name
        self.assertEquals(field_label, 'age')


class BookModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        author = Author.objects.create(name='Test Author', email='author@test.com', age=35)
        Book.objects.create(name='Test Book', author=author)

    def test_name_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_author_label(self):
        book = Book.objects.get(id=1)
        field_label = book._meta.get_field('author').verbose_name
        self.assertEquals(field_label, 'author')


class SubjectModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Subjects.objects.create(description='Test Subject')

    def test_description_label(self):
        subject = Subjects.objects.get(id=1)
        field_label = subject._meta.get_field('description').verbose_name
        self.assertEquals(field_label, 'description')
