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

fs=FileSystemStorage(location='tmp/')

@api_view(['POST'])
def login(request):
    data=request.data
    user_data=userdata.objects.all()
    for user in user_data:
        if data['userid'] == user.id:
            passwd =  data['password'].encode()
            if bcrypt.checkpw(passwd,user.password):
                return Response("login successfull")
            else:
                break
    return Response("user name or password incorrect")

@api_view(['POST'])
def signup(request):
    data=request.data
    id=data['userid']
    password=data['password']
    repass=data['repass']
    if repass != password:
        return Response('check the passwords')
    else:
        datas=userdata.objects.create(
            id=id,
            password=bcrypt.hashpw(password.encode(),bcrypt.gensalt())
        )
        return Response('user created')
