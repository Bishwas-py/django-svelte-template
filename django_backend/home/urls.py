from django.urls import path

from . import views

urlpatterns = [
    path('site-data/', views.get_site_data, name="get_site_data"),
]
