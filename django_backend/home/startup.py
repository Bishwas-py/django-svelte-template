import logging

SITE_DEFAULT_DATA = {
    'title': 'Djapy - Django and Python Supremacy',
    'subtitle': 'We love django and python, so should you',
    'description': 'freelancing, coding, indie dev, app dev',
    'domain': 'djapy.io',
    'name': 'Djapy',
    'keywords': 'django, python, djapy, coding, indie dev, app dev',
    'ads_on': False,
}


def site_data_db_startup():
    """
    This function is called to store default site data in the database.
    """
    from django.contrib.sites.models import Site
    from home.models import SiteData

    site = Site.objects.first()
    if not site:
        print("Creating site")
        Site.objects.create(
            domain=SITE_DEFAULT_DATA['domain'],
            name=SITE_DEFAULT_DATA['name']
        )
    else:
        print(f"Site already exists: {site.domain}")

    if not SiteData.objects.filter(site=site).exists():
        print("Creating site data")
        SiteData.objects.create(
            site=site,
            title=SITE_DEFAULT_DATA['title'],
            subtitle=SITE_DEFAULT_DATA['subtitle'],
            description=SITE_DEFAULT_DATA['description'],
            keywords=SITE_DEFAULT_DATA['keywords'],
            ads_on=SITE_DEFAULT_DATA['ads_on']
        )
    else:
        print("Site data already exists")

    site_data = SiteData.objects.get(site=site)
    print(
        f"Site data:\nSite name: {site_data.site.name}"
        f"\nSite title: {site_data.title}"
        f"\nSite subtitle: {site_data.subtitle}"
        f"\nSite description: {site_data.description}"
        f"\nSite keywords: {site_data.keywords}"
        f"\nSite ads on: {site_data.ads_on}"
        f"\nSite domain: {site_data.site.domain}"
        f"\nSite id: {site_data.site.id}"
    )
