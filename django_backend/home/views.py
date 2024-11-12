from django.contrib.sites.models import Site
from django.views.decorators.csrf import ensure_csrf_cookie
from djapy import djapify

from home.schema import InitDataSchema


@ensure_csrf_cookie
@djapify
def get_init_data(request) -> {200: InitDataSchema}:
   site = Site.objects.get_current(request)
   return {
      "site_data": site.sitedata,
      "current_user": request.user if request.user.is_authenticated else None
   }
