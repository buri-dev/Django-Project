from django.test import TestCase
from .models import Todo


# Create your tests here.
class TodoModelTests(TestCase):
    def test_todo_model_can_create_todo(self):
        """
        Test that the todo model can create a todo
        """
        Todo.objects.create(title='Test Todo')
        self.assertEqual(Todo.objects.count(), 1)
