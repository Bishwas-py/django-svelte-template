
from django.contrib import admin
from django.urls import path, include
from djapy.openapi import openapi
from django_kit_fos import trigger_pattern

urlpatterns = [
    path('', openapi.urls),
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('home/', include('home.urls')),
    path('todos/', include('todo.urls')),
] + trigger_pattern
