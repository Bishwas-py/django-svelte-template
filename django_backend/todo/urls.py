from django.urls import path
from . import views

urlpatterns = [
   path('', views.list_todos, name='list_todos'),
   path('<int:todo_id>/', views.get_todo, name='get_todo'),
   path('create/', views.create_todo, name='create_todo'),
   path('update/<int:todo_id>/', views.update_todo, name='update_todo'),
   path('delete/', views.delete_todo, name='delete_todo'),
]
