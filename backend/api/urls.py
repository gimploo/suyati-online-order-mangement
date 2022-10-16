from django.urls import path
from . import views

urlpatterns = [

    # User apis
    path('api/login/', views.login, name='login'),
    path('api/signup/', views.signup, name='signup'),

    path('api/user/product/all/',
         views.get_all_products_from_a_user, name='get_all_products_from_a_user'),

    # Product apis
    path('api/product/:pid', views.get_product, name='get_product'),
    path('api/product/add/', views.add_product, name='add_product'),
    path('api/product/edit/:pid', views.edit_product, name='edit_product'),
    path('api/product/delete/:pid', views.delete_product, name='delete_product'),
    path('api/product/category/all/', views.get_available_categories,
         name='get_available_categories'),

    # ml
    path('api/product/category/stock/recommendation', views.get_stock_recommendation,
         name='get_stock_recommendation'),
]
