from django.db import models
from datetime import date
import uuid

# Create your models here.
class User(models.Model):
    """
    can add more fields, these are just the boilerplate
    """

    USER_TYPES = (
        (1, 'Buyer'),
        (2, 'Seller'),
        (3, 'Both')
    )
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fullname    = models.CharField(max_length=200)
    dob         = models.DateField(max_length=8)
    email       = models.CharField(max_length=200)
    password    = models.CharField(max_length=200)
    role        = models.IntegerField(choices=USER_TYPES, default=1)
    added_date  = models.DateField(default=date.today)

    def get_age(self):
        today = date.today()
        try: 
            birthday = self.dob.replace(year=today.year)
        # raised when birth date is February 29 and the current year is not a leap year
        except ValueError:
            birthday = self.dob.replace(year=today.year, day=born.day-1)

        if birthday > today:
            return today.year - born.year - 1
        else:
            return today.year - born.year

    def get_user_type(self):
        return self.role
    
    def __str__(self):
        return self.fullname


class Product(models.Model):
    """
    can add more fields, these are just the boilerplate
    """
    pid = models.IntegerField(primary_key=True)
    pname = models.CharField(max_length=200)
    price = models.FloatField()
    added_date = models.DateField(default=date.today)
    edited_date = models.DateField(default=date.today)

    def __str__(self):
        return self.pname
