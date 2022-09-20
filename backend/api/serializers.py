from rest_framework import serializers
from .models import *
from rest_framework.settings import api_settings

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        optional_fields = ['added_date']
        fields = ('id', 'fullname', 'dob', 'email', 'password', 'role')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('pid','pname','price','added_date','edited_date')
