from django.db import models
from django.contrib.auth.models import User


class Filme(models.Model):
    id = models.TextField(primary_key=True)
    capa = models.TextField(null=True, blank=True)
    title = models.TextField()
    year = models.IntegerField(null=True, blank=True)
    info = models.TextField(null=True, blank=True)
    ratings = models.IntegerField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.id}.{self.title}-{self.year}'
