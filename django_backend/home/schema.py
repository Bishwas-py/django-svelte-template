from typing import Optional
from djapy import Schema
from djapy.schema.schema import ImageUrl

from authentication.schemas.user_schema import UserSchema


class SiteSchema(Schema):
   id: int
   domain: str
   name: str


class SiteDataSchema(Schema):
   site: SiteSchema
   scheme: str
   title: str
   subtitle: str
   email: str
   description: str
   thumbnail: ImageUrl
   keywords: Optional[str] = ''
   ads_on: bool


class InitDataSchema(Schema):
   site_data: SiteDataSchema
   current_user: Optional[UserSchema] = None
