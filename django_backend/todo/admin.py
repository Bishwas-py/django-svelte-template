from django.contrib import admin

from todo.models import TodoItem


# Register your models here.
@admin.register(TodoItem)
class TodoItemAdmin(admin.ModelAdmin):
   pass
