from datetime import datetime

from djapy import Schema
from djapy.schema import Outsource
from djapy.schema.schema import ImageUrl
from pydantic import computed_field


class StatusSchema(Schema):
   is_confirmed: bool


class ProfileSchema(Schema):
   bio: str | None
   location: str | None
   birth_date: str | None
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
