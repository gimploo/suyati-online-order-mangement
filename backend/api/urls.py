from django.urls import path
from . import views

urlpatterns = [
    path('api/login/',views.login, name='login'),
    path('api/signup/',views.signup,name='signup'),
    path('api/delete_user/',views.delete_user,name='delete_user'),
    path('api/get_product/',views.get_product,name='get_product'),
    path('api/add_product/',views.add_product,name='add_product'),
    path('api/edit_product/',views.edit_product,name='edit_product'),
    path('api/delete_product/',views.delete_product,name='delete_product'),
]
