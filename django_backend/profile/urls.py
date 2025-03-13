from django.urls import path

from .views import update_profile

urlpatterns = [
    path("update/", update_profile, name="profile_update"),
]
