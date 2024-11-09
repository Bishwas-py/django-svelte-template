from djapy import Schema
from pydantic import EmailStr

from generics.schemas import MessageOut


class EmailTimeMessageOut(MessageOut):
   time_left: int = None


class UsernameOutSchema(Schema):
   username: str


class GetEmailSchema(Schema):
   email: EmailStr
