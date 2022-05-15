from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('order/', views.take_order, name='take-order'),
    path('order/<int:order_id>/', views.get_order_by_id, name='order-detail'),
    path('delete/<int:order_id>/', views.delete_order, name='delete order'),
    path('update/<int:order_id>/', views.update_order, name='update order'),
]
