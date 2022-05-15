import json
from django.shortcuts import render, HttpResponse
from .models import Food, Order, OrderedFoods


# Create your views here.
def index(request):
    context = dict()
    context['foods'] = Food.objects.all()
    result = list()
    for order in Order.objects.all():
        data = dict(foods=list(), total=0)
        data['id'] = order.id
        data['total'] = order.total
        data['is_paid'] = order.is_paid
        for ordered_food in OrderedFoods.objects.filter(order=order):
            data_food = {
                "name": ordered_food.food.name,
                "quantity": ordered_food.quantity
            }
            data['foods'].append(data_food)
        result.append(data)
    context['orders'] = result
    return render(request, 'agd/index.html', context)


def delete_order(request, order_id):
    Order.objects.get(id=order_id).delete()
    return HttpResponse('Order deleted!')


def update_order(request, order_id):
    order = Order.objects.get(id=order_id)
    order.is_paid = True
    order.save()
    return HttpResponse('Order updated!')


def get_order_by_id(request, order_id):
    order = Order.objects.get(id=order_id)
    data = {
        "id": order.id,
        "total": order.total,
        "foods": [str(food) for food in order.ordered_foods.all()]
    }
    return HttpResponse(json.dumps(data), content_type='application/json')


def take_order(request):
    result = list()
    total_price = 0
    for data in json.loads(request.body)['foodOrders']:
        total_price += int(data['price'][:-1]) * data['quantity']
        result.append(data)
    order = Order.objects.create(total=total_price)
    order.refresh_from_db()
    OrderedFoods.objects.bulk_create([
        OrderedFoods(
            order=order,
            food=Food.objects.get(id=int(food['id'])),
            quantity=food['quantity']
        ) for food in result
    ])
    return HttpResponse('Thank you for your order!')
