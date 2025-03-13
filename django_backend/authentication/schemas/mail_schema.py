from djapy import Schema
from generics.schemas import MessageOut
from pydantic import EmailStr


class EmailTimeMessageOut(MessageOut):
    time_left: int = None


class UsernameOutSchema(Schema):
    username: str


class GetEmailSchema(Schema):
    email: EmailStr
