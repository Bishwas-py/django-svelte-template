from datetime import datetime
from typing import Optional

from django.db.models.fields.files import ImageFieldFile
from djapy import Schema
from djapy.schema import Outsource
from pydantic import Field, field_validator, computed_field


class StatusSchema(Schema):
    is_confirmed: bool


class ProfileSchema(Schema):
    bio: str | None
    location: str | None
    birth_date: str | None
    image: Optional[str]

    @field_validator('image', mode='before')
    def validate_image(cls, image: ImageFieldFile | None):
        if image:
            return image.url


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
