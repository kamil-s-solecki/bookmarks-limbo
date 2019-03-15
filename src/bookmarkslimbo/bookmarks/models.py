from django.contrib.auth.models import User
from django.db import models


class Bookmark(models.Model):
    expiration = models.DateTimeField()
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=255, blank=True, null=True)
    link = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ('expiration',)
