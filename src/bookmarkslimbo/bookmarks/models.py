from django.db import models


class Bookmark(models.Model):
    expiration = models.DateTimeField()
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=255, blank=True, null=True)
    link = models.CharField(max_length=255)

    class Meta:
        ordering = ('expiration',)
