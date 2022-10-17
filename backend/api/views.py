import pandas as pd

<<<<<<< HEAD
#from itsdangerous import Serializer
=======
from enum import Enum
import json
from itsdangerous import Serializer
>>>>>>> 223192f3133c5d792daa07f392e12f130a7b6f83

from ml.models import SeasonalDemandClassifier

from . models import *
from .serializers import *
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework import serializers, viewsets
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from rest_framework.generics import ListAPIView
import bcrypt
from datetime import date
from django.db import models
from django.core import serializers

fs = FileSystemStorage(location='tmp/')
"""
(gokul): the reason i am doing this is to do proper checks at the frontend so to definitely
know what kind of data its getting
"""

# sesonal demand model
ml_sd = SeasonalDemandClassifier()


class ApiResponseMessageType(Enum):
    CORRECT_EMAIL_AND_PASSWORD = 1
    WRONG_EMAIL_AND_PASSWORD = 2
    WRONG_PASSWORD = 3
    INPUT_FIELD_EMAIL_EMPTY = 4
    INPUT_FIELD_PASSWORD_EMPTY = 5
    UNKNOWN_MESSAGE_TYPE = 6
    USERNAME_ALREADY_TAKEN = 7
    EMAIL_ALREADY_TAKEN = 8
    SIGNUP_SUCCESSFULL = 9

    USER_INVALID = 10
    USER_DELETED = 11

<<<<<<< HEAD
    PRODUCT_FOUND = 12
    NO_PRODUCT_FOUND = 13
    PRODUCT_AVAILABLE_CATEGORIES = 14
    ALL_PRODUCTS_FROM_USER = 15

    PRODUCT_PRICE_IS_ZERO_OR_LESS = 16
    PRODUCT_NAME_IS_EMPTY = 17
    PRODUCT_QUANTITY_IS_ZERO = 18
    PRODUCT_ALREADY_EXIST = 19
    PRODUCT_ADDED_SUCCESSFULLY = 20
    PRODUCT_PRICE_INVALID = 21
=======
    PRODUCT_FOUND = 11
    NO_PRODUCT_FOUND = 12
    PRODUCT_AVAILABLE_CATEGORIES = 13
    ALL_PRODUCTS_FROM_USER = 14
    PRODUCT_ADDED_SUCCESSFULLY = 20
>>>>>>> 223192f3133c5d792daa07f392e12f130a7b6f83

    def to_string(self):
        return f'{self.name}'


def api_model_response(messagetype: ApiResponseMessageType, data: models.Model = None) -> Response:
    response = {
        'message': messagetype.to_string(),
        'data': serializers.serialize('python', [data]) if data is not None else {}
    }
    print(response)
    return Response(response)


<<<<<<< HEAD
def api_data_response(messagetype: ApiResponseMessageType, serialized_data = None) -> Response:
=======
def api_data_response(messagetype: ApiResponseMessageType, serialized_data=None) -> Response:
>>>>>>> 223192f3133c5d792daa07f392e12f130a7b6f83
    response = {
        'message': messagetype.to_string(),
        'data': serialized_data
    }
    print(response)
    return Response(response)


@api_view(['POST'])
def login(request):
    data = request.data
    email = data['email']
    password = data['password']
    if email == "":
        return api_model_response(ApiResponseMessageType.INPUT_FIELD_EMAIL_EMPTY)
    elif password == "":
        return api_model_response(ApiResponseMessageType.INPUT_FIELD_PASSWORD_EMPTY)

    for user in User.objects.all():
        if email == user.email:
            if password == user.password:
                return api_model_response(ApiResponseMessageType.CORRECT_EMAIL_AND_PASSWORD, user)
            else:
                return api_model_response(ApiResponseMessageType.WRONG_PASSWORD)
    return api_model_response(ApiResponseMessageType.WRONG_EMAIL_AND_PASSWORD)


def get_role_id(type_name):
    if type_name == "BUYER":
        return 1
    elif type_name == "SELLER":
        return 2
    elif type_name == "BOTH":
        return 3
    print("ILLEGAL TYPE")
    exit(-1)


@api_view(['POST'])
def signup(request):
    data = request.data
    fullname = data['fullname']
    username = data['username']
    dob = data['dob']
    email = data['email']
    password = data['password']
    role = get_role_id(data['role'])

    user_data = User.objects.all()
    for user in user_data:
        if username == user.username:
            return api_model_response(ApiResponseMessageType.USERNAME_ALREADY_TAKEN)
        if email == user.email:
            return api_model_response(ApiResponseMessageType.EMAIL_ALREADY_TAKEN)

    user = User.objects.create(
        fullname=fullname,
        username=username,
        dob=dob,
        email=email,
        password=password,
        role=role,
    )
    return api_model_response(ApiResponseMessageType.SIGNUP_SUCCESSFULL, user)


@api_view(['POST'])
def delete_user(request):
    data = request.data
    id = data['id']
    user_data = User.objects.all()
    for user in user_data:
        if id == user.id:
            user.delete()
            return api_model_response(ApiResponseMessageType.USER_DELETED, user.id)
            #return Response(f'{id} deleted successfully')
    return api_model_response(ApiResponseMessageType.USER_INVALID)


@api_view(['GET'])
def get_product(request, pid):
    print("pid:",pid)
    product_data = Product.objects.get(id=pid)
    print("product_data",product_data)
    if (product_data is None):
        return api_model_response(ApiResponseMessageType.NO_PRODUCT_FOUND)
    return api_model_response(ApiResponseMessageType.PRODUCT_FOUND, product_data)


@api_view(['POST'])
def add_product(request):
    data = request.data
    print(data)
    pname = data['name']
    price = int(data['price'])
    category = data['category']
    quantity = int(data['quantity'])
    status = data['status']
    image = data['image']
    username = data['username']

    if price <= 0:
        return api_model_response(ApiResponseMessageType.PRODUCT_PRICE_IS_ZERO_OR_LESS)
        #return Response('PRODUCT_PRICE_IS_ZERO_OR_LESS')
    if pname == "":
        return api_model_response(ApiResponseMessageType.PRODUCT_NAME_IS_EMPTY)
        #return Response('PRODUCT_NAME_IS_EMPTY')
    if quantity <= 0:
        return api_model_response(ApiResponseMessageType.PRODUCT_QUANTITY_IS_ZERO)
        #return Response('PRODUCT_QUANTITY_IS_ZERO')

    product_data = Product.objects.all()
    for product in product_data:
        if pname == product.name:
            #return Response('PRODUCT_ALREADY_EXIST')
            return api_model_response(ApiResponseMessageType.PRODUCT_ALREADY_EXIST)

    user = User.objects.get(username=username)
    if (user is None):
        return api_model_response(ApiResponseMessageType.USER_INVALID)

    datas = Product.objects.create(
        userid=user,
        name=pname,
        category=category,
        price=price,
        quantity=quantity,
        status=status,
        image=image
    )
<<<<<<< HEAD
    #return Response('PRODUCT_ADDED_SUCCESSFULLY')
    return api_model_response(ApiResponseMessageType.PRODUCT_ADDED_SUCCESSFULLY)
=======
    return api_data_response(ApiResponseMessageType.PRODUCT_ADDED_SUCCESSFULLY)
>>>>>>> 223192f3133c5d792daa07f392e12f130a7b6f83


@api_view(['GET'])
def edit_product(request, pid):
    data = request.data
    pname = data['name']
    price = data['price']
    status = data['status']
    quantity = data['quantity']
    if price <= 0:
        return api_model_response(ApiResponseMessageType.PRODUCT_PRICE_INVALID)
        #return Response('PRODUCT_PRICE_INVALID')
    elif pname == "":
        return api_model_response(ApiResponseMessageType.PRODUCT_NAME_EMPTY)
        #return Response('PRODUCT_NAME_EMPTY')

    product = Product.objects.get(id=pid)
    if (product is None):
        return api_model_response(ApiResponseMessageType.NO_PRODUCT_FOUND)
    product.name = pname
    product.price = price
    product.quantity = quantity
    product.edited_date = date.today()
    product.status = status
    product.save()
    return api_model_response(ApiResponseMessageType.PRODUCT_EDITED_SUCCESSFULLY)
    #return Response('PRODUCT_EDITED_SUCCESSFULLY')


@api_view(['POST'])
def delete_product(request, pid):
    product = Product.objects.get(id=id)
    if (product is None):
        return api_model_response(ApiResponseMessageType.NO_PRODUCT_FOUND)
    product.delete()
    return Response(f'product {pid} deleted successfully')


@api_view(['POST'])
def get_available_categories(request):
    return Response(
        Product.get_categories()
    )


@api_view(['POST'])
def get_all_products_from_a_user(request):
    username = request.data['username']
    user = User.objects.get(username=username)
    if (user is None):
        return api_model_response(ApiResponseMessageType.USER_INVALID)

    products = Product.objects.all().filter(userid=user)
    serializer = ProductSerializer(products, many=True)
    return api_data_response(ApiResponseMessageType.ALL_PRODUCTS_FROM_USER, serializer.data)


@api_view(['POST'])
def get_stock_recommendation(request):
    category = request.data['category']
    return Response(json.dumps(ml_sd.predict_today(category)))


@api_view(['POST'])
def get_stock_recommendation_for_entire_year(request):
    return Response(json.dumps(ml_sd.predict_an_entire_year()))
