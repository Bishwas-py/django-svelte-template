from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from authentication.extras.tokenizer import Tokenizer
from authentication.models import ConfirmMailToken
from django.contrib.sites.models import Site
from ninja import Router


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # Get all unconfirmed users
        UserModel = get_user_model()
        unconfirmed_users = UserModel.objects.filter(status__is_confirmed=False)

        for unconfirmed_user in unconfirmed_users:
            # Create confirmation token
            confirm_email_token = Tokenizer(ConfirmMailToken, unconfirmed_user)
            confirm_email_token.get_or_create_token()

            unconfirmed_user.status.token = confirm_email_token.token
            unconfirmed_user.status.save()

            # Skip if there is a restriction on the number of emails sent
            if confirm_email_token.response:
                continue

            site = Site.objects.get_current()
            unconfirmed_user.email_user(
                subject='Thank you for registering with Webmatrices, please confirm your email',
                message=f'We saw that you recently registered with Webmatrices. '
                        f'We just got access to a mailing service, so we are sending '
                        f'you this email to confirm your email. '
                        f'Please click on the link below to confirm your email:'
                        f' {site.sitedata.url}/confirm-email-{confirm_email_token.token.token_key}.',
            )
            print(f"Confirmation email sent to {unconfirmed_user.email}")
