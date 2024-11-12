import sys

from django.apps import AppConfig


class HomeConfig(AppConfig):
   default_auto_field = 'django.db.models.BigAutoField'
   name = 'home'

   def ready(self):
      from home.startup import site_data_db_startup
      if ('makemigrations' not in sys.argv and 'migrate' not in sys.argv
        and 'collectstatic' not in sys.argv
        and 'createsuperuser' not in sys.argv
        and 'dbshell' not in sys.argv):
         site_data_db_startup()
