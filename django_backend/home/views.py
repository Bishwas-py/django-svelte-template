from django.contrib.sites.models import Site
from django.views.decorators.csrf import ensure_csrf_cookie
from djapy import djapify

from home.schema import SiteDataSchema


@ensure_csrf_cookie
@djapify
def get_site_data(request) -> {200: SiteDataSchema}:
    site = Site.objects.get_current(request)
    return site.sitedata
