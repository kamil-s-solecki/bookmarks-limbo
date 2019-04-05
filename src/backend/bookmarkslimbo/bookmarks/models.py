from django.contrib.auth.models import User
from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=128)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('name', 'owner'),)


class Bookmark(models.Model):
    expiration = models.DateTimeField()
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=255, blank=True, null=True)
    link = models.URLField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)

    class Meta:
        ordering = ('expiration',)
