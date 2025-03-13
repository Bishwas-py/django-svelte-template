from authentication.schemas.user_schema import UserSchema
from django.contrib.auth import get_user_model
from djapy import djapify

TAGS = ["User"]


@djapify
def get_user_by_username(request, username: str) -> UserSchema:
    user = get_user_model().objects.get(username=username)
    return user
