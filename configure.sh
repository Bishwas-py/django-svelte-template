#!/bin/bash

# Set base directories
CONFIG_DIR="./django_backend/config"
FRONTEND_DIR="./svelte_frontend"

# Print function
print_status() {
    local level=$1
    shift
    local message=$@
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message"
}

# Error handling
set -e
trap 'print_status ERROR "An error occurred on line $LINENO"' ERR

# Create config directories
print_status INFO "Creating config directories"
mkdir -p "$CONFIG_DIR"
mkdir -p "$FRONTEND_DIR"

# Function to create config files
create_config() {
    local file=$1
    local content=$2
    local filename=$(basename "$file")

    print_status INFO "Creating: $filename"
    echo "$content" > "$file" && print_status INFO "Created: $filename"
}

print_status INFO "Creating configuration files..."

# db.py
create_config "$CONFIG_DIR/db.py" "from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
DATABASES = {
   'default': {
      'ENGINE': 'django.db.backends.sqlite3',
      'NAME': BASE_DIR / 'db.sqlite3',
   }
}"

# env.py
create_config "$CONFIG_DIR/env.py" "CSRF_TRUSTED_ORIGINS = [
   'http://localhost:5173',
]
DEBUG = True
PRODUCTION = False
ALLOWED_HOSTS = []
STRIPE_SECRET_KEY = 'sk_test_*'
STRIPE_WEBHOOK_SECRET_KEY = 'whsec*'
SECRET_KEY = 'django-insecure-pt50ualer8otrcli1@#@nsfqe*$f4mbtp+rug@rkyr^bia$fz!'
LOGGING = {}"

# mail.py
create_config "$CONFIG_DIR/mail.py" "EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = \"localhost\"
EMAIL_PORT = \"1725\"
EMAIL_HOST_USER = \"\"
EMAIL_HOST_PASSWORD = \"\"
EMAIL_USE_TLS = False
EMAIL_USE_SSL = False
DEFAULT_FROM_EMAIL = \"info@developsite.com\""

# frontend .env
create_config "$FRONTEND_DIR/.env" "SECRET_BASE_API=http://localhost:8000"

# Summary
print_status INFO "Configuration setup completed"
echo -e "\nCreated files:"
find "$CONFIG_DIR" "$FRONTEND_DIR/.env" -type f -exec ls -l {} \;