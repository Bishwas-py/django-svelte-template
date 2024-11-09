from django.contrib.auth import get_user_model
from django.views.decorators.cache import cache_page
from djapy import djapify, SessionAuth

from authentication.schemas.user_schema import UserSchema

TAGS = ["User"]


@djapify
def get_user_by_username(request, username: str) -> {200: UserSchema}:
   user = get_user_model().objects.get(username=username)
   return user
