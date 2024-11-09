#!/bin/bash

# Create the config directory if it doesn't exist
mkdir -p ./config

# db.py
cat <<EOL > ./config/db.py
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DATABASES = {
   'default': {
      'ENGINE': 'django.db.backends.sqlite3',
      'NAME': BASE_DIR / 'db.sqlite3',
   }
}
EOL

# env.py
cat <<EOL > ./config/env.py
CSRF_TRUSTED_ORIGINS = [
   'http://localhost:5173',
]
DEBUG = True
PRODUCTION = False
ALLOWED_HOSTS = []
STRIPE_SECRET_KEY = 'sk_test_*'
STRIPE_WEBHOOK_SECRET_KEY = 'whsec*'
EOL

# mail.py
cat <<EOL > ./config/mail.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = "localhost"
EMAIL_PORT = "1725"
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
EMAIL_USE_TLS = False
EMAIL_USE_SSL = False
DEFAULT_FROM_EMAIL = "info@developsite.com"
EOL

echo "Configuration files have been created in the ./config/ directory."