from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.add_todo, name='add'),
    path('complete/<todo_id>', views.complete_todo, name='complete'),
    path('deletecomplete/', views.delete_completed, name='deletecomplete'),
    path('deleteall/', views.delete_all, name='deleteall'),
]
