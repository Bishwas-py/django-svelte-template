import datetime
from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from django.db.models.signals import post_save
from django.utils.crypto import get_random_string
from django.db import models

from django.utils import timezone

import logging

from authentication.extras import constants
from authentication.extras.tokenizer import Tokenizer
from profile.models import Profile


class AuthToken(models.Model):
   token_key = models.CharField(max_length=100, unique=True)
   token_key_expires = models.DateTimeField(blank=True, null=True)
   last_sent_time = models.DateTimeField(blank=True, null=True, default=timezone.now)

   class Meta:
      abstract = True

   def set_token(self, expires_in: int = constants.TOKEN_EXPIRES_MINUTES):
      self.token_key = get_random_string(length=9)
      self.token_key_expires = timezone.now() + datetime.timedelta(minutes=expires_in)
      self.save()

   def is_resend_allowed(self):
      if self.last_sent_time and timezone.now() < self.token_key_expires:
         time_difference_from_last_sent_time = timezone.now() - self.last_sent_time
         time_gap = datetime.timedelta(minutes=constants.RESEND_EMAIL_MINUTES)
         if time_difference_from_last_sent_time < time_gap:
            time_left = (time_gap - time_difference_from_last_sent_time)
            return False, time_left
      return True, 0

   def is_token_expired(self):
      return timezone.now() > self.token_key_expires

   def is_token_valid(self, token_to_compare: str):
      return self.token_key == token_to_compare


class ForgotPasswordToken(AuthToken):
   user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='forgot_password_token')


class ForgotUsernameToken(AuthToken):
   user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='forgot_email_token')

   def __str__(self):
      return f'{self.user.username} - {self.token_key}'


class ConfirmMailToken(AuthToken):
   """
   Tokens are used for email confirmation, password reset, etc.
   """
   user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='confirm_mail_token')

   class Meta:
      verbose_name = 'Confirm Mail Token'
      verbose_name_plural = 'Confirm Mail Tokens'

   def __str__(self):
      return f'Mail confirmation Token: {self.token_key}'

   @classmethod
   def send_token(cls, request, user):
      confirm_email_token = Tokenizer(ConfirmMailToken, user)
      confirm_email_token.get_or_create_token()

      user.status.set_token_and_save(confirm_email_token.token)

      site = Site.objects.get_current(request)
      user.email_user(
         subject='Confirm your email',
         message=f'Please click on the link below to confirm your email:'
                 f' {site.sitedata.url}/confirm-email-{confirm_email_token.token.token_key}.',
      )


class Status(models.Model):
   user = models.OneToOneField(User, on_delete=models.CASCADE)
   token = models.ForeignKey(ConfirmMailToken, on_delete=models.SET_NULL, blank=True, null=True)
   is_confirmed = models.BooleanField(default=False)

   def set_confirmed(self):
      self.token = None
      self.is_confirmed = True
      self.save()
      return True, "Successfully confirmed email."

   def set_token_and_save(self, token):
      self.token = token
      self.save()

   def __str__(self):
      return f"{self.user.username} - {self.is_confirmed}"

   class Meta:
      verbose_name = 'Status'
      verbose_name_plural = 'Status'


def create_profile_with_status(sender, instance, created, **kwargs):
   if created:
      logging.info(f"Creating profile for {instance.username}")
      user_profile = Profile.objects.create(user=instance)
      user_status = Status.objects.create(user=instance)
      user_profile.save()
      user_status.save()


post_save.connect(create_profile_with_status, sender=User)
