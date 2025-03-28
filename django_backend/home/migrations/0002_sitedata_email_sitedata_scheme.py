# Generated by Django 5.0.6 on 2024-05-24 03:11

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="sitedata",
            name="email",
            field=models.EmailField(
                default=django.utils.timezone.now, max_length=254
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="sitedata",
            name="scheme",
            field=models.CharField(
                choices=[("http", "http"), ("https", "https")],
                default="https",
                max_length=10,
            ),
        ),
    ]
