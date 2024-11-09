from django.contrib.sites.models import Site
from django.db import models


class SiteData(models.Model):
   site = models.OneToOneField(Site, on_delete=models.CASCADE)
   scheme = models.CharField(max_length=10, default="https", choices=(("http", "http"), ("https", "https")))
   title = models.CharField(max_length=250)
   subtitle = models.CharField(max_length=250)
   email = models.EmailField()
   description = models.TextField()
   thumbnail = models.ImageField(upload_to="thumbnail/", blank=True, null=True)
   keywords = models.CharField(null=True, blank=True, max_length=500)
   ads_on = models.BooleanField(default=False)

   def __str__(self):
      return self.title

   @property
   def url(self):
      return f"{self.scheme}://{self.site.domain}"

   class Meta:
      verbose_name = "Site Data"
      verbose_name_plural = "Site Data"
