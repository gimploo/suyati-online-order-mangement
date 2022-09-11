from django.db import models
from datetime import date

# Create your models here.
class userdata(models.Model):
    """
    can add more fields, these are just the boilerplate
    """
    id = models.CharField(primary_key=True,max_length=200)
    password = models.BinaryField()
    added_date = models.DateField(default=date.today)


class productdata(models.Model):
    """
    can add more fields, these are just the boilerplate
    """
    pid = models.IntegerField(primary_key=True)
    pname = models.CharField(max_length=200)
    price = models.FloatField()
    added_date = models.DateField(default=date.today)
    edited_date = models.DateField(default=date.today)
