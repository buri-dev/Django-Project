from django.contrib import admin
from .models import Food, Order, OrderedFoods
# Register your models here.

admin.site.register(Food)
admin.site.register(Order)
admin.site.register(OrderedFoods)



