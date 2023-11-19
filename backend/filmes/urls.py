from . import views
from django.urls import path

urlpatterns = [
    path('', views.api_catalogo),
    path('filmes', views.api_filme),
    path('<str:filme_id>',views.api_catalogo),

]