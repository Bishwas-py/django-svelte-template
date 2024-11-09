from djapy.schema import Form
from pydantic import model_validator

from generics.schemas import Inline
from djapy_ext.exception import MessageValueError


class LoginSchema(Form):
   username: str | None = None
   email: str | None = None
   password: str

   @model_validator(mode='after')
   def username_or_email_must_be_valid(cls, values):
      username = values.username
      email = values.email
      if username or email:
         return values
      raise MessageValueError(
         message="Username or email must be provided.",
         message_type="error",
         alias="username_or_email_not_provided",
         inline={
            "username": "This field is required.",
            "email": "This field is required.",
         }
      )
