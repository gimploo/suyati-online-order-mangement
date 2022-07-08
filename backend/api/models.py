from django.db import models

# Create your models here.
class userdata(models.Model):
    id = models.CharField(primary_key=True,max_length=200)
    password=models.BinaryField()
