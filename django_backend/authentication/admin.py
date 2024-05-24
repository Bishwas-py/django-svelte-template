from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.urls import reverse
from django.utils.html import format_html

from .models import Status
from profile.models import Profile

admin.site.site_header = 'Webmatrices Admin'
admin.site.site_title = "Admin"
admin.site.unregister(User)


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()

    list_display = ['session_key', '_session_data', 'expire_date']


class StatusInline(admin.StackedInline):
    model = Status
    can_delete = False
    verbose_name_plural = 'Status'
    fk_name = 'user'


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline, StatusInline)
    list_display = ('username', 'email', 'get_is_confirmed', 'is_superuser', 'date_joined', 'related_publishable',
                    'related_credits_usage')
    list_filter = ('status__is_confirmed', 'is_superuser', 'date_joined')
    list_select_related = ('profile', 'status')
    ordering = ('-id',)

    @admin.display(description='View publishable')
    def related_publishable(self, obj):
        link = reverse("admin:generics_publishable_changelist") + "?viewer__id__exact=" + str(obj.id)
        return format_html('<a href="{}">View related publishable</a>', link)

    @admin.display(description='View credits usage')
    def related_credits_usage(self, obj):
        # first_user_credit.credit_usages.add(usage) # credit_usages is a related name
        # first_user_credit has `user` as a foreign key
        # first_user_credit.credit_usages is a related manager
        link = reverse("admin:payout_creditusage_changelist") + "?credit__user__id__exact=" + str(obj.id)
        return format_html('<a href="{}">View related credits usage</a>', link)

    @admin.display(description='Is Confirmed', ordering='status__is_confirmed')
    def get_is_confirmed(self, instance):
        return instance.status.is_confirmed

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)
