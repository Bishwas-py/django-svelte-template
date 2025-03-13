"""Authentication Admin Configuration."""

from profile.models import Profile

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session

from .models import Status

admin.site.site_header = "Webmatrices Admin"
admin.site.site_title = "Admin"
admin.site.unregister(User)


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    """Session Admin Configuration."""

    def _session_data(self, obj):
        return obj.get_decoded()

    list_display = ["session_key", "_session_data", "expire_date"]


class StatusInline(admin.StackedInline):
    """Status Inline Configuration."""

    model = Status
    can_delete = False
    verbose_name_plural = "Status"
    fk_name = "user"


class ProfileInline(admin.StackedInline):
    """Profile Inline Configuration."""

    model = Profile
    can_delete = False
    verbose_name_plural = "Profile"
    fk_name = "user"


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """Custom User Admin Configuration."""

    inlines = (ProfileInline, StatusInline)
    list_display = (
        "username",
        "email",
        "get_is_confirmed",
        "is_superuser",
        "date_joined",
    )
    list_filter = ("status__is_confirmed", "is_superuser", "date_joined")
    list_select_related = ("profile", "status")
    ordering = ("-id",)

    @admin.display(description="Is Confirmed", ordering="status__is_confirmed")
    def get_is_confirmed(self, instance):
        """Return is_confirmed status."""
        return instance.status.is_confirmed
