from typing import Optional

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from djapy import Schema
from djapy.schema import Form
from pydantic import field_validator, Field, constr, EmailStr

MESSAGE_SEPERATOR = '|--|'

email_validator = EmailValidator()

User = get_user_model()


class UserRegisterSchema(Form):
   username: constr(min_length=3, max_length=150)
   email: EmailStr
   password: constr(min_length=8)

   @field_validator('username')
   def username_must_be_valid(cls, username: str):
      if not username.isalnum():
         raise ValueError('Username must be alphanumeric.')
      if username.isdigit():
         raise ValueError('Username must not be only digit.')
      if User.objects.filter(username=username).exists():
         raise ValueError('User with this username already exists.')

      return username

   @field_validator('email')
   def email_must_be_valid(cls, email: str):
      try:
         email_validator(email)
      except ValidationError:
         raise ValueError(email_validator.message)
      if User.objects.filter(email=email).exists():
         raise ValueError('User with this email might already exists.')
      return email

   @field_validator('password')
   def password_must_be_valid(cls, password: str):
      try:
         validate_password(password)
      except ValidationError as e:
         raise ValueError(MESSAGE_SEPERATOR.join(e.messages))


class AuthOutSchema(Schema):
   is_authenticated: bool
   user_id: int = Field(..., alias="id")
   username: str
   redirect: Optional[str] = None
