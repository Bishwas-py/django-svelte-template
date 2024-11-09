from typing import Union, Type, TYPE_CHECKING

from django.contrib.auth.models import User

if TYPE_CHECKING:
   from authentication.models import AuthToken, ForgotUsernameToken, ForgotPasswordToken, ConfirmMailToken
from authentication.schemas.mail_schema import EmailTimeMessageOut


class Tokenizer:
   def __init__(self, token_object: 'Type[ConfirmMailToken | ForgotPasswordToken | ForgotUsernameToken]', user: User):
      self.token_object = token_object
      self.user = user
      self.response: EmailTimeMessageOut | None = None
      self.token = None

   def get_or_create_token(self) -> 'Union[AuthToken, None]':
      try:
         token = self.token_object.objects.get(user=self.user)
         resend_allowed, time_left = token.is_resend_allowed()
         if not resend_allowed:
            time_left_in_minutes = f'{time_left.seconds // 60} minutes and {time_left.seconds % 60} seconds'
            self.response = {
               "message": f"Please wait {time_left_in_minutes} before requesting another token.",
               "message_type": "error",
               "alias": "wait_before_resend",
               "time_left": time_left.seconds
            }
            return None
         token.delete()
      except self.token_object.DoesNotExist:
         pass
      token = self.token_object(user=self.user)
      token.set_token()
      self.token = token
