from typing import Dict, Any
from django.db import transaction
from django.contrib.sites.models import Site
from dataclasses import dataclass
from utils.c_logging import logger

try:
   from config.env import DOMAIN
except ImportError:
   DOMAIN = 'localhost:5173'


@dataclass
class SiteDefaults:
   title: str = 'Djapy - Django and Python Supremacy'
   subtitle: str = 'We love django and python, so should you'
   description: str = 'freelancing, coding, indie dev, app dev'
   domain: str = DOMAIN
   name: str = 'Djapy'
   keywords: str = 'django, python, djapy, coding, indie dev, app dev'
   ads_on: bool = False

   def to_dict(self) -> Dict[str, Any]:
      return {
         field.name: getattr(self, field.name)
         for field in self.__dataclass_fields__.values()
      }


def get_or_create_site(defaults: SiteDefaults) -> Site:
   """Create or retrieve the default site."""
   try:
      site = Site.objects.first()
      if not site:
         logger.info("Creating new site")
         site = Site.objects.create(
            domain=defaults.domain,
            name=defaults.name
         )
      else:
         logger.info(f"Using existing site: {site.domain}")
      return site
   except Exception as e:
      logger.error(f"Error creating/retrieving site: {str(e)}")
      raise


def create_or_update_site_data(site: Site, defaults: SiteDefaults):
   """Create or update site data."""
   from home.models import SiteData

   try:
      site_data, created = SiteData.objects.get_or_create(
         site=site,
         defaults={
            'title': defaults.title,
            'subtitle': defaults.subtitle,
            'description': defaults.description,
            'keywords': defaults.keywords,
            'ads_on': defaults.ads_on
         }
      )

      if created:
         logger.info("Created new site data")
      else:
         logger.info("Using existing site data")

      return site_data
   except Exception as e:
      logger.error(f"Error creating/updating site data: {str(e)}")
      raise


def log_site_data(site_data) -> None:
   """Log site data in a structured format."""
   try:
      info = {
         'Site name': site_data.site.name,
         'Site title': site_data.title,
         'Site subtitle': site_data.subtitle,
         'Site description': site_data.description,
         'Site keywords': site_data.keywords,
         'Site ads on': site_data.ads_on,
         'Site domain': site_data.site.domain,
         'Site id': site_data.site.id
      }

      logger.info("Site data configuration:")
      for key, value in info.items():
         logger.info(f"{key}: {value}")
   except Exception as e:
      logger.error(f"Error logging site data: {str(e)}")


@transaction.atomic
def site_data_db_startup() -> None:
   """
   Initialize or update site data in the database.
   Uses atomic transaction to ensure data consistency.
   """
   try:
      defaults = SiteDefaults()
      site = get_or_create_site(defaults)
      site_data = create_or_update_site_data(site, defaults)
      log_site_data(site_data)

   except Exception as e:
      logger.error(f"Failed to initialize site data: {str(e)}")
      raise
