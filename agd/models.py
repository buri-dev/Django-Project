from django.db import models


# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    food_type = models.CharField(max_length=10, default=['drink', 'food', 'dessert'])

    def __str__(self):
        return self.name


class Order(models.Model):
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total = models.IntegerField()
    ordered_foods = models.ManyToManyField(Food, through='OrderedFoods')

    def __str__(self):
        return str(self.id)


class OrderedFoods(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)


    def __str__(self):
        return self.food.name

