from django.shortcuts import render, redirect
from .models import Todo
from .forms import TodoForm
from django.views.decorators.http import require_POST


# Create your views here.
def index(request):
    context = dict()
    form = TodoForm()

    context['form'] = form
    context['todos'] = Todo.objects.order_by('id')
    print(context.get('todos'))
    print([x.id for x in context.get('todos')])
    return render(request, 'todo/index.html', context)


@require_POST
def add_todo(request):
    form = TodoForm(request.POST)
    if form.is_valid():
        new_todo = Todo(title=form.data.get('title'))
        new_todo.save()
    return redirect('index')


def complete_todo(request, todo_id):
    todo = Todo.objects.get(id=todo_id)
    todo.completed = True
    todo.save()
    return redirect('index')


def delete_completed(request):
    Todo.objects.filter(completed=True).delete()
    return redirect('index')


def delete_all(request):
    Todo.objects.all().delete()
    return redirect('index')
