import re
from typing import Tuple

import msgs
from authentication.extras.tokenizer import Tokenizer
from authentication.models import ForgotPasswordToken
from authentication.schemas.mail_schema import EmailTimeMessageOut
from django.contrib.auth import get_user_model
from django.contrib.sites.models import Site
from django.views.decorators.csrf import csrf_exempt
from djapy import Schema, djapify
from djapy.schema import as_json
from generics.schemas import Inline, MessageOut
from pydantic import EmailStr, field_validator

TAGS = ["Forgot Password"]

PASSWORD_REGEX = (
    r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
)


@djapify(method="POST")
@csrf_exempt
def request_password_token(
    request, email: as_json[EmailStr]
) -> MessageOut | Tuple[400, Inline] | Tuple[429, EmailTimeMessageOut]:
    try:
        user_with_email = get_user_model().objects.get(email=email)
    except get_user_model().DoesNotExist:
        return 400, {
            "inline": {"email": "User with this email does not exist."}
        }

    forgot_password_token = Tokenizer(ForgotPasswordToken, user_with_email)
    forgot_password_token.get_or_create_token()

    if forgot_password_token.message:
        return 429, forgot_password_token.message

    # Email the user their token
    site = Site.objects.get_current(request)
    user_with_email.email_user(
        subject="Forgot Password",
        message=msgs.FORGOT_PASS_MESSAGE.format(
            origin=site.sitedata.url,
            token=forgot_password_token.token.token_key,
        ),
    )

    return {
        "message": "A password reset link has been sent to your email.",
        "message_type": "success",
        "alias": "password_reset_link_sent",
    }


class ResetPasswordIn(Schema):
    password: str
    token: str
    password_confirmation: str

    @field_validator("password_confirmation")
    def validate_password_confirmation(cls, conf_password, info):
        if conf_password != info.data.get("password"):
            raise ValueError("passwords do not match")
        return conf_password

    @field_validator("password")
    def validate_password(cls, password):
        if not re.match(PASSWORD_REGEX, password):
            raise ValueError(
                "Password must contain at least 8 characters, 1 uppercase, "
                "1 lowercase, 1 number and 1 special character."
            )
        return password


@djapify(method="PUT")
@csrf_exempt
def reset_password(
    request, data: ResetPasswordIn
) -> MessageOut | Tuple[400, Inline] | Tuple[429, EmailTimeMessageOut]:
    try:
        forgot_password_token = ForgotPasswordToken.objects.get(
            token_key=data.token
        )
    except ForgotPasswordToken.DoesNotExist:
        return 400, {
            "message": "The token is invalid or expired.",
            "message_type": "error",
            "alias": "invalid_token",
        }

    if forgot_password_token.is_token_expired():
        return 400, {
            "message": "The token is invalid or expired.",
            "message_type": "error",
            "alias": "invalid_token",
        }
    if not forgot_password_token.is_token_valid(data.token):
        return 400, {
            "message": "The token is invalid or expired.",
            "message_type": "error",
            "alias": "invalid_token",
        }

    forgot_password_token.user.set_password(data.password)
    forgot_password_token.user.save()
    forgot_password_token.delete()

    return {
        "message": "Password reset successfully.",
        "message_type": "success",
        "alias": "password_reset_success",
    }
