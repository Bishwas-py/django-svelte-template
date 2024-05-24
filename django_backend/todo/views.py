from typing import List

from djapy import djapify, SessionAuth
from djapy.pagination import paginate
from djapy.schema import Form, Schema
from todo.models import TodoItem

AUTH_MECHANISM = SessionAuth()


class TodoItemSc(Schema):
    id: int
    title: str
    completed: bool


@djapify
@paginate
def list_todos(request) -> {200: List[TodoItemSc]}:
    todos = TodoItem.objects.filter(user=request.user)
    return todos


@djapify
def get_todo(request, todo_id: int) -> {200: TodoItemSc}:
    todo = TodoItem.objects.get(id=todo_id)
    return todo


class TodoItemSchema(Form):
    title: str
    completed: bool


@djapify(allowed_method='POST')
def create_todo(request, todo: TodoItemSchema) -> {201: TodoItemSc}:
    todo = TodoItem.objects.create(
        user=request.user,
        title=todo.title,
        completed=todo.completed
    )
    return 201, todo


@djapify(allowed_method='PUT')
def update_todo(request, todo_id: int, todo: TodoItemSchema) -> {200: TodoItemSc}:
    todos = TodoItem.objects.filter(id=todo_id)
    todos.update(
        title=todo.title,
        completed=todo.completed
    )
    return todo
