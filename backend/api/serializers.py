from rest_framework import serializers
from .models import *
from rest_framework.settings import api_settings

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = userdata
        fields = ('password','id','added_date')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = productdata
        fields = ('pid','pname','price','added_date','edited_date')
