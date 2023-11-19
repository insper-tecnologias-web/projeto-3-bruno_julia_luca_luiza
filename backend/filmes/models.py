from django.db import models


class Filme(models.Model):
    id = models.TextField(primary_key=True)
    capa = models.TextField(null=True, blank=True)
    title = models.TextField()
    year = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return f'{self.id}.{self.title}-{self.year}'
