
from django.contrib import admin
from django.urls import path, include
from djapy.openapi import openapi

urlpatterns = [
    path('', openapi.urls),
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('todos/', include('todo.urls')),
]
