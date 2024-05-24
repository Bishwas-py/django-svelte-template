from django.contrib.auth import get_user_model
from django.views.decorators.cache import cache_page
from djapy import djapify, SessionAuth

from authentication.schemas.user_schema import UserSchema

TAGS = ["User"]


@djapify(auth=SessionAuth)
def get_user_info(request) -> {200: UserSchema, 400: bool}:
    """
    Get user
    Sends the user object to the frontend, also tracks the user. This apps_api is bound to the middle-end heavily.
    """
    return request.user


@djapify
def get_user_by_username(request, username: str) -> {200: UserSchema}:
    user = get_user_model().objects.get(username=username)
    return user
