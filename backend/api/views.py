from . models import *
from .serializers import *
from django.http import HttpResponseRedirect,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,action
from rest_framework import serializers,viewsets
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from rest_framework.generics import ListAPIView
import bcrypt
from datetime import date

fs=FileSystemStorage(location='tmp/')

@api_view(['POST'])
def login(request):
    data=request.data
    id = data['id']
    password = data['password']
    if id == "":
        return Response('username cannot be empty')
    elif password == "":
        return Response('please supply a password')
    user_data=userdata.objects.all()
    for user in user_data:
        if id == user.id:
            passwd =  password.encode()
            if bcrypt.checkpw(passwd,user.password):
                return Response('login successfull')
            break
    return Response('username or password incorrect')

@api_view(['POST'])
def signup(request):
    data=request.data
    id=data['id']
    password=data['password']
    repass=data['repass']
    if id == "":
        return Response('username cannot be empty')
    elif repass != password:
        return Response('check the passwords')
    elif repass == "" or password == "":
        return Response('password cant be null')
    user_data=userdata.objects.all()
    for user in user_data:
        if id == user.id:
            return Response("username already taken")
    datas=userdata.objects.create(
        id=id,
        password=bcrypt.hashpw(password.encode(),bcrypt.gensalt())
    )
    datas.save()
    return Response('user created')

@api_view(['POST'])
def delete_user(request):
    data=request.data
    id=data['id']
    user_data=userdata.objects.all()
    for user in user_data:
        if id == user.id:
            user.delete()
            return Response(f'{id} deleted successfully')
    return Response('username not found')


@api_view(['POST'])
def get_product(request):
    data=request.data
    pid = data['pid']
    product_data = productdata.objects.all()
    for product in product_data:
        if pid == product.pid:
            return Response(f'Name:{product.pname},Price:{product.price},Added On:{product.added_date},Last Edited:{product.edited_date}')
    return Response('no product found')

@api_view(['POST'])
def add_product(request):
    data=request.data
    pid=data['pid']
    pname=data['pname']
    price=data['price']
    if pid < 1:
        return Response('pid invalid')
    elif price < 0:
        return Response('price invalid')
    elif pname == "":
        return Response('supply a product name')
    product_data = productdata.objects.all()
    for product in product_data:
        if pid == product.pid:
            return Response('product already exists')
    datas=productdata.objects.create(
        pid=pid,
        pname=pname,
        price=price,
    )
    datas.save()
    return Response('product added successfully')

@api_view(['POST'])
def edit_product(request):
    data=request.data
    pid=data['pid']
    pname=data['pname']
    price=data['price']
    if price < 0:
        return Response('price invalid')
    elif pname == "":
        return Response('supply a product name')
    product_data = productdata.objects.all()
    for product in product_data:
        if pid == product.pid:
            product.pname=pname
            product.price=price
            product.edited_date=date.today()
            product.save()
            return Response('product edited successfully')
    return Response('product not found')

@api_view(['POST'])
def delete_product(request):
    data=request.data
    product_data = productdata.objects.all()
    for product in product_data:
        if pid == product.pid:
            product.delete()
            return Response(f'product {pid} deleted successfully')
    return Response('product not found')
