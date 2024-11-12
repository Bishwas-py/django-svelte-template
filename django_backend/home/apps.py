import sys
from django.apps import AppConfig
from django.core.signals import request_started


class HomeConfig(AppConfig):
   default_auto_field = 'django.db.models.BigAutoField'
   name = 'home'

   def ready(self):
      # Skip database initialization for management commands
      if self.should_skip_initialization():
         return

      # Connect to the request_started signal instead of running directly
      request_started.connect(self.initialize_site_data, dispatch_uid="initialize_site_data")

   def should_skip_initialization(self):
      management_commands = {
         'makemigrations', 'migrate', 'collectstatic',
         'createsuperuser', 'dbshell', 'test'
      }
      return any(cmd in sys.argv for cmd in management_commands)

   def initialize_site_data(self, sender, **kwargs):
      # Disconnect the signal after first run to prevent multiple executions
      request_started.disconnect(self.initialize_site_data, dispatch_uid="initialize_site_data")

      # Import and run the initialization
      from home.startup import site_data_db_startup
      site_data_db_startup()
