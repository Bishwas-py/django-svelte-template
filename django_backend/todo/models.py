from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class TodoItem(models.Model):
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   title = models.CharField(max_length=100)
   completed_at = models.DateTimeField(null=True, blank=True)
   # started_at = models.DateTimeField(null=True, blank=True)
   will_complete_at = models.DateTimeField(null=True, blank=True)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)

   def __str__(self):
      return self.title
