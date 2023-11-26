from rest_framework import serializers
from .models import Filme


class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filme
        fields = ['id','capa', 'title', 'year', 'info','ratings']