from datetime import datetime, timedelta
from typing import List, Any, Optional

from django.http import HttpResponse
from djapy import djapify, SessionAuth
from djapy.pagination import paginate
from djapy.schema import Form, Schema
from pydantic import field_validator, constr

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
def list_todos(request, **kwargs) -> {200: List[TodoItemSc]}:
   todos = TodoItem.objects.filter(user=request.user)
   return todos.order_by('-created_at')


@djapify
def get_todo(request, todo_id: int) -> {200: TodoItemSc}:
   todo = TodoItem.objects.get(id=todo_id)
   return todo


class TodoItemSchema(Form):
   title: constr(max_length=100, min_length=5)
   completed_at: Optional[datetime] = None
   will_complete_at: Optional[datetime] = None

   @field_validator('completed_at', 'will_complete_at', mode="before")
   def validate_completed_at(cls, v):
      # Form validation, can accept a list of values
      if v and v[0]:
         return v[0]


@djapify(allowed_method='POST')
def create_todo(request, todo: TodoItemSchema) -> {201: bool}:
   TodoItem.objects.create(
      user=request.user,
      title=todo.title,
      completed_at=todo.completed_at,
      will_complete_at=todo.will_complete_at if todo.will_complete_at else datetime.now() + timedelta(hours=9)
   )
   return 201, True


@djapify(allowed_method='POST')
def update_todo(request, todo_id: int, todo: TodoItemSchema) -> {200: bool}:
   todos = TodoItem.objects.filter(id=todo_id)
   todos.update(
      title=todo.title,
      completed_at=todo.completed_at,
      will_complete_at=todo.will_complete_at
   )
   return 200, True


@djapify(allowed_method='DELETE')
def delete_todo(request, todo_id: int) -> Any:
   todo = TodoItem.objects.get(id=todo_id)
   todo.delete()
   return HttpResponse(status=204)
