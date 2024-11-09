from django.contrib.sites.models import Site
from djapy import djapify, SessionAuth
from djapy.schema import uni_schema

from authentication.extras.tokenizer import Tokenizer
from authentication.models import ConfirmMailToken
from generics.schemas import ActionMessageOut, MessageOut
from authentication.schemas.mail_schema import EmailTimeMessageOut

TAGS = ["Confirm Email"]

AUTH_MECHANISM = SessionAuth


@djapify
def send_confirmation_email(request) -> {200: MessageOut, 208: ActionMessageOut, 429: EmailTimeMessageOut}:
   """
   Send a new confirmation email to the user
   """
   user = request.user
   if user.status.is_confirmed:
      return 208, {
         "message": "The user's email is already confirmed.",
         "message_type": "success",
         "alias": "already_confirmed",
         "redirect": "/"
      }
   confirm_email_token = Tokenizer(ConfirmMailToken, user)
   confirm_email_token.get_or_create_token()

   user.status.token = confirm_email_token.token
   user.status.save()

   if confirm_email_token.response:
      return 429, confirm_email_token.response

   site = Site.objects.get_current(request)
   user.email_user(
      subject='Confirm your email',
      message=f'Please click on the link below to confirm your email:'
              f' {site.sitedata.url}/confirm-email-{confirm_email_token.token.token_key}.',
   )
   return {
      "message": "Confirmation email sent successfully.",
      "message_type": "success",
      "alias": "confirmation_email_sent",
   }


@djapify
def confirm_email(request, confirmation_token: str) -> uni_schema(MessageOut, {200, 400, 422}):
   user = request.user
   if user.status.is_confirmed:
      return 200, {
         "message": "The user's email is already confirmed.",
         "message_type": "success",
         "alias": "already_confirmed",
      }
   if not user.status.token:
      return 400, {
         "message": "The user does not have a confirmation token.",
         "message_type": "error",
         "alias": "no_confirmation_token",
      }
   if not user.status.token.is_token_valid(confirmation_token):
      return 422, {
         "message": "Invalid token.",
         "message_type": "error",
         "alias": "invalid_token",
      }
   if user.status.token.is_token_expired():
      return 422, {
         "message": "Token has expired.",
         "message_type": "error",
         "alias": "token_expired",
      }

   success, message = user.status.set_confirmed()
   if success:
      return 200, {
         "message": "User's email confirmed successfully.",
         "message_type": "success",
         "alias": "email_confirmed",
      }

   return 400, {
      "message": message,
      "message_type": "error",
      "alias": "email_not_confirmed",
   }
