"""Views for the todo app."""

from datetime import datetime, timedelta
from typing import Any, List, Optional, Tuple

from django.http import HttpResponse
from djapy import SessionAuth, djapify
from djapy.pagination import paginate
from djapy.schema import Form, Schema
from pydantic import constr, field_validator
from todo.models import TodoItem

AUTH_MECHANISM = SessionAuth()


class TodoItemSc(Schema):
    id: int
    title: str
    completed_at: Optional[datetime] = None
    will_complete_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime


@djapify
@paginate
def list_todos(request, **kwargs) -> List[TodoItemSc]:
    todos = TodoItem.objects.filter(user=request.user)
    return todos.order_by("-created_at")


@djapify
def get_todo(request, todo_id: int) -> TodoItemSc:
    todo = TodoItem.objects.get(id=todo_id)
    return todo


class TodoItemSchema(Form):
    title: constr(max_length=100, min_length=5)  # type: ignore
    completed_at: Optional[datetime] = None
    will_complete_at: Optional[datetime] = None

    @field_validator("completed_at", "will_complete_at", mode="before")
    def validate_completed_at(cls, v):
        # Form validation, can accept a list of values
        if v and v[0]:
            return v[0]


@djapify(method="POST")
def create_todo(request, todo: TodoItemSchema) -> Tuple[201, bool]:
    """Create a todo item."""
    TodoItem.objects.create(
        user=request.user,
        title=todo.title,
        completed_at=todo.completed_at,
        will_complete_at=(
            todo.will_complete_at
            if todo.will_complete_at
            else datetime.now() + timedelta(hours=9)
        ),
    )
    return 201, True


@djapify(method="POST")
def update_todo(
    request, todo_id: int, todo: TodoItemSchema
) -> Tuple[200, bool]:
    todos = TodoItem.objects.filter(id=todo_id)
    todos.update(
        title=todo.title,
        completed_at=todo.completed_at,
        will_complete_at=todo.will_complete_at,
    )
    return 200, True


@djapify(method="DELETE")
def delete_todo(request, todo_id: int) -> Any:
    """Delete a todo item."""
    todo = TodoItem.objects.get(id=todo_id)
    todo.delete()
    return HttpResponse(status=204)
