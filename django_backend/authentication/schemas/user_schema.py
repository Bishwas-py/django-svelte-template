from datetime import datetime

from djapy import Schema
from djapy.schema import Outsource
from djapy.schema.schema import ImageUrl
from pydantic import computed_field
from typing import Optional
from datetime import date

class StatusSchema(Schema):
    is_confirmed: bool


class ProfileSchema(Schema):
    bio: Optional[str] = None
    location: Optional[str] = None
    birth_date: Optional[date] = None
    image: ImageUrl


class GenericUserSchema(Schema):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    is_staff: bool
    is_superuser: bool
    is_active: bool
    status: StatusSchema
    profile: ProfileSchema


class UserSchema(GenericUserSchema, Outsource):
    date_joined: datetime

    @computed_field
    def user_permissions(self) -> set[str]:
        return self._obj.get_user_permissions()
