from django.contrib import admin
from django.urls import include, path
from djapy.openapi import openapi

from .kit import sveltekit_actions_handler

openapi.set_basic_info(
    site_name="Django Backend",
    title="Django Backend API",
    description="Django Backend API Documentation",
)

urlpatterns = [
    path("", openapi.urls),
    path("admin/", admin.site.urls),
    path("auth/", include("authentication.urls")),
    path("home/", include("home.urls")),
    path("todos/", include("todo.urls")),
    path("action/", sveltekit_actions_handler),
    path("profile/", include("profile.urls")),
]
