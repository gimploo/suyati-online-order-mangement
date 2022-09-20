from django.contrib import admin
from .models import *

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    fields = ('id', 'fullname', 'dob', 'email', 'password', 'role', 'added_date')
admin.site.register(User, UserAdmin)

admin.site.register(Product)