from typing import TYPE_CHECKING, Type, Union

import msgs
from django.contrib.auth.models import User

if TYPE_CHECKING:
    from authentication.models import (
        AuthToken,
    )

from authentication.schemas.mail_schema import EmailTimeMessageOut


class Tokenizer:
    def __init__(
        self,
        token_object: "Type[AuthToken]",
        user: User,
    ):
        self.token_object = token_object
        self.user = user
        self.message: EmailTimeMessageOut | None = None
        self.token = None

    def get_or_create_token(self) -> "Union[AuthToken, None]":
        try:
            token = self.token_object.objects.get(user=self.user)
            resend_allowed, time_left = token.is_resend_allowed()
            if not resend_allowed:
                time_left_in_minutes = msgs.TIME_LEFT_MESSAGE.format(
                    mins=time_left.seconds // 60, secs=time_left.seconds % 60
                )
                self.message = {
                    "message": msgs.WAIT_MESSAGE.format(
                        time_left=time_left_in_minutes
                    ),
                    "message_type": "error",
                    "alias": "wait_before_resend",
                    "time_left": time_left.seconds,
                }
                return None
            token.delete()
        except self.token_object.DoesNotExist:
            pass
        token = self.token_object(user=self.user)
        token.set_token()
        self.token = token
