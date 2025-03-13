from typing import Tuple

from authentication.models import ConfirmMailToken
from authentication.schemas import UserRegisterSchema
from authentication.schemas.auth_schema import LoginSchema
from authentication.schemas.mail_schema import EmailTimeMessageOut
from django.contrib.auth import get_user_model, login
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from djapy import SessionAuth, djapify
from generics.schemas import ActionMessageOut, Inline, MessageOut

User = get_user_model()


@djapify(method="POST")
@csrf_exempt
def register_user(
    request, user_payload: UserRegisterSchema
) -> ActionMessageOut | Tuple[400, Inline] | Tuple[429, EmailTimeMessageOut]:
    """
    Register User
    If user is registered successfully, user will be logged in,
    and email will be sent to user's email with confirmation link.
    Also, login token will be returned in response headers.
    ```
    Set-Cookie: sessionid=<session_string>;
     expires=<time>; HttpOnly; Max-Age=<time>; Path=/; SameSite=Lax
    ```
    """
    try:
        user = User.objects.create_user(
            username=user_payload.username,
            email=user_payload.email,
            password=user_payload.password,
        )
        ConfirmMailToken.send_token(request, user)
    except IntegrityError:
        return 400, {
            "inline": {
                "username": "User with this username already exists.",
                "email": "User with this email already exists.",
            }
        }
    except ConnectionRefusedError:
        return 400, {
            "message": "User registered, but email could not be sent.",
            "message_type": "error",
            "alias": "email_not_sent",
        }
    login(request, user)

    return {
        "message": "User registered successfully.",
        "message_type": "success",
        "alias": "register_success",
        "redirect": "/",
    }


@ensure_csrf_cookie
@csrf_exempt
@djapify(method="POST")
def login_user(
    request, data: LoginSchema
) -> ActionMessageOut | Tuple[400, Inline]:
    """
    Login User
    If user is logged in successfully, login token will be returned in response
    headers.
    ```
    Set-Cookie: sessionid=<session_string>;
     expires=<time>; HttpOnly; Max-Age=<time>; Path=/; SameSite=Lax
    ```
    """

    try:
        if data.username:
            user_dict = dict(username=data.username)
        else:
            user_dict = dict(email=data.email)
        user = User.objects.get(**user_dict)
    except (User.DoesNotExist, User.MultipleObjectsReturned):
        return 400, {
            "inline": {
                "username": "User with this username does not exist.",
                "email": "User with this email does not exist.",
            }
        }
    if not user.check_password(data.password):
        return 400, {"inline": {"password": "Password is incorrect."}}

    login(request, user)
    return {
        "message": "User logged in successfully.",
        "message_type": "success",
        "alias": "register_success",
        "redirect": "/",
    }


@djapify(auth=SessionAuth)
def logout_user(request) -> MessageOut:
    """
    Logout user
    """
    request.user.auth_token.delete()
    return {
        "message": "User logged out successfully.",
        "message_type": "success",
        "alias": "logout_success",
    }
