from . import views
from django.urls import path

urlpatterns = [
    path('', views.api_catalogo),
    path('filmes', views.api_filme),
    path('title/<str:title>',views.api_search),
    path('generos/<str:genre>',views.api_genre_search),
    path('generos',views.api_genre),
    path('<str:filme_id>',views.api_catalogo),
    path('token/', views.api_get_token),
    path('api/users/', views.api_user),
    path('filmes/<str:filme_id>/',views.api_filme),
    path('filmes/ratings/<str:filme_id>/<int:ratings>/',views.api_ratings),
]