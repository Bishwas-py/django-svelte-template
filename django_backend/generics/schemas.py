from typing import Literal, Optional, TypedDict

from djapy import Schema
from pydantic_core.core_schema import datetime


class MessageOut(TypedDict):
    """
    Message errors are used to return errors in the response body.
    Usually to be displayed in a toast.
    """

    message: str
    message_type: Literal["error", "warning", "success", "info"]
    alias: str


class ActionMessageOut(MessageOut):
    redirect: Optional[str]


# TODO: Make it typeddict
class Inline(TypedDict):
    """
    Inline errors are used to return errors in the response body.
    Usually to be displayed inline with the form.
    """

    inline: dict[str, str | list[str]]


class InlineMessageOut(MessageOut, Inline):
    pass


class GenericSchema(Schema):
    id: int
    created_at: datetime
    updated_at: datetime
    soft_deleted_at: datetime | None = None
