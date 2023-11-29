from django.shortcuts import render,redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import Http404, HttpResponseForbidden, JsonResponse
from .models import Filme
import requests
from .serializers import FilmSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

#Definindo a URL e os parâmetros da API com catalogo de filmes
url = "https://moviesdatabase.p.rapidapi.com/titles"
# querystring = {"titleType":"movie","sort":"year.decr","endYear":"2023","limit":"50"}
querystring = {"titleType":"movie","limit":"50","info":"base_info","list":"top_boxoffice_200"}
headers = {
	"X-RapidAPI-Key": "974506e2f7msheefcc0e5ef73fd3p101df4jsnff960d6053af",
	"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
}
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def api_catalogo(request,filme_id=None):
    url = "https://moviesdatabase.p.rapidapi.com/titles/random"
    # querystring = {"sort":"year.decr","limit":"50","endYear":"2023","list":"most_pop_movies"}
    querystring = {"titleType":"movie","limit":"50","info":"base_info","list":"top_boxoffice_200"}
    headers = {
	    "X-RapidAPI-Key": "974506e2f7msheefcc0e5ef73fd3p101df4jsnff960d6053af",
	    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
    }
    if request.method == 'GET':
        response = requests.get(url, headers=headers, params=querystring)
        return Response(response.json()['results'])
    
    elif request.method == 'POST' and filme_id != 'filmes':
        filme_id = request.data
        filme_id = str(filme_id['id'])
        print('O filme de id: {id} foi adicionado ao catálogo'.format(id=filme_id))

        url = "https://moviesdatabase.p.rapidapi.com/titles/{id}".format(id=filme_id)
        response = requests.get(url, headers=headers, params=querystring)
        filmecompleto = response.json()['results']
        print('FILME COMPLETO:',filmecompleto)

        filme = {}
        filme['id'] = filmecompleto['id']
        if filmecompleto['primaryImage'] is None:
            filme['capa'] = "https://fastly.picsum.photos/id/250/800/1200.jpg?hmac=mLfkxoNEwjCn6yE7Y7c4ExK1GoWmo69QwYcxQ7Rns_E"
        else:
            filme['capa'] = filmecompleto['primaryImage']['url']
        filme['title'] = filmecompleto['titleText']['text']
        filme['year'] = filmecompleto['releaseYear']['year']
        filme['info'] = filmecompleto['plot']['plotText']['plainText']
        print('FILME:',filme)

        Filme.objects.create(id=filme['id'],capa=filme['capa'],title=filme['title'], year=filme['year'], info=filme['info'], user=request.user)
        serialized_filme = FilmSerializer(filme)
        return Response(serialized_filme.data)

@api_view(['GET', 'DELETE'])
def api_filme(request,filme_id=None):
    if request.method == 'GET':
        films = Filme.objects.filter(user=request.user)
        serializer = FilmSerializer(films, many=True)
        return Response(serializer.data)
    if request.method == 'DELETE':
        try:
            filme = Filme.objects.get(id=filme_id)
            print('O filme {filme} foi deletado com exito'.format(filme=filme))
            filme.delete()
            return Response(status=204)
        except Filme.DoesNotExist:
            raise Http404()


@api_view(['GET'])
def api_search(request,title):
    if request.method == 'GET':
        querystring = {"exact":"false","info":"base_info","endYear":"2023","titleType":"movie","limit":"50"}
        headers = {
            "X-RapidAPI-Key": "974506e2f7msheefcc0e5ef73fd3p101df4jsnff960d6053af",
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
        }
        url = "https://moviesdatabase.p.rapidapi.com/titles/search/title/{id}".format(id=title)
        response = requests.get(url, headers=headers, params=querystring)
        filmes = response.json()['results']

        print("Sua busca foi realizada com sucesso!")

        return Response(filmes)

@api_view(['POST'])
def api_ratings(request,filme_id=None, ratings=None):
    if request.method == 'POST':
        print("entrou")
        try:
            filme = Filme.objects.get(id=filme_id)
            filme.ratings = ratings
            filme.save()
            return Response({'message': 'Rating updated successfully'}, status=200)
        except Filme.DoesNotExist:
            raise Http404()
    
@api_view(['GET'])
def api_genre(request):
    if request.method == 'GET':
        
        headers = {
            "X-RapidAPI-Key": "974506e2f7msheefcc0e5ef73fd3p101df4jsnff960d6053af",
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
        }
        url = "https://moviesdatabase.p.rapidapi.com/titles/utils/genres"
        response = requests.get(url, headers=headers)

        generos = response.json()['results']
        #print(generos)

        return Response(generos)


@api_view(['POST'])
def api_get_token(request):
    print(request)
    try:
        if request.method == 'POST':
            username = request.data['username']
            password = request.data['password']
            print("entrou aqui......")
            user = authenticate(username=username, password=password)
            print(user, "user ta aqui")
            if user is not None:
                print("user nao é none")
                token, created = Token.objects.get_or_create(user=user)
                return JsonResponse({"token":token.key})
            else:
                return HttpResponseForbidden()
    except:
        return HttpResponseForbidden()

@api_view(['POST'])
def api_user(request):
    if request.method == 'POST':
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']

        user = User.objects.create_user(username, email, password)
        user.save()
        return Response(status=204)
    
@api_view(['GET'])
def api_genre_search(request, genre):
    if request.method == 'GET':
        
        headers = {
            "X-RapidAPI-Key": "974506e2f7msheefcc0e5ef73fd3p101df4jsnff960d6053af",
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
        }

        query = {
            "titleType": "movie",
            "list": "top_boxoffice_200",
            "limit":"50",
            "info":"base_info",
            "genre": genre
        }

        url = "https://moviesdatabase.p.rapidapi.com/titles/random"

        try:
            response = requests.get(url, headers=headers, params=query)
            response.raise_for_status()  # Isso verifica se houve erro na requisição
            filmes_genero = response.json()['results']
            print("Seus filmes foram encontrados com sucesso!")
            print(filmes_genero)
            return Response(filmes_genero)
        except requests.exceptions.RequestException as e:
            print(f"Erro ao buscar filmes: {e}")
            return Response({"error": "Erro ao buscar filmes"}, status=500)

