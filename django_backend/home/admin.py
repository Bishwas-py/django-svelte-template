from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse

from home.models import SiteData


@admin.register(SiteData)
class SiteDataAdmin(admin.ModelAdmin):
   def changelist_view(self, request, extra_context=None):
      if self.model.objects.all().count() == 1:
         obj = self.model.objects.first()
         return HttpResponseRedirect(
            reverse("admin:%s_%s_change" % (self.model._meta.app_label, self.model._meta.model_name),
                    args=(obj.id,)))
      else:
         return HttpResponseRedirect(
            reverse("admin:%s_%s_add" % (self.model._meta.app_label, self.model._meta.model_name), ))
      return super(SiteData, self).changelist_view(request=request, extra_context=extra_context)
