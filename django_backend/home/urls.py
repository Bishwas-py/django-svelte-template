from django.urls import path

from . import views

urlpatterns = [
   path('init-data/', views.get_init_data, name="get_init_data"),
]
