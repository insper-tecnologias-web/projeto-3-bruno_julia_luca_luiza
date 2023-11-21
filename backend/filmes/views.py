from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404, JsonResponse
from .models import Filme
import requests
from .serializers import FilmSerializer


#Definindo a URL e os parâmetros da API com catalogo de filmes
url = "https://moviesdatabase.p.rapidapi.com/titles"
# querystring = {"titleType":"movie","sort":"year.decr","endYear":"2023","limit":"50"}
querystring = {"titleType":"movie","limit":"50","info":"base_info","list":"top_boxoffice_200"}
headers = {
	"X-RapidAPI-Key": "974506e2f7msheefcc0e5ef73fd3p101df4jsnff960d6053af",
	"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
}

def index(request):
    if request.method == 'GET':    
        all_filmes = []
        response = requests.get(url, headers=headers, params=querystring)
        for filmecompleto in response.json()['results'][:]:
            print(filmecompleto)
            filme = {}
            if filmecompleto['primaryImage'] is not None:
                filme['id'] = filmecompleto['id']
                filme['capa'] = filmecompleto['primaryImage']['url']
                filme['title'] = filmecompleto['titleText']['text']
                filme['year'] = filmecompleto['releaseYear']['year']
            else:
                filme['id'] = filmecompleto['id']
                filme['capa'] = "https://via.placeholder.com/300x200?text=Imagem+N%C3%A3o+Dispon%C3%ADvel"
                filme['title'] = filmecompleto['titleText']['text']
                filme['year'] = filmecompleto['releaseYear']['year']

            # all_filmes[filmecompleto['id']] = filme
            all_filmes.append(filme)
            return render(request, 'filmes/index.html', {'filmes': response.json()['results']})

            # return JsonResponse(all_filmes)

# def delete(request,filme_id):
#     if request.method == 'POST':
#         Filme.objects.filter(id=filme_id).delete()
#         return redirect('filmes:index')
    

    
@api_view(['GET', 'POST'])
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

        Filme.objects.create(id=filme['id'],capa=filme['capa'],title=filme['title'], year=filme['year'], info=filme['info'])
        serialized_filme = FilmSerializer(filme)
        return Response(serialized_filme.data)

@api_view(['GET', 'DELETE'])
def api_filme(request,filme_id=None):
    if request.method == 'GET':
        films = Filme.objects.all()
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
def api_search(request,title=None):
    if request.method == 'GET':
        querystring = {"titleType":"movie","limit":"50","info":"base_info","list":"top_boxoffice_200"}
        headers = {
            "X-RapidAPI-Key": "974506e2f7msheefcc0e5ef73fd3p101df4jsnff960d6053af",
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
        }
        url = "https://moviesdatabase.p.rapidapi.com/titles/search/title/%7Bid%7D".format(id=title)
        response = requests.get(url, headers=headers, params=querystring)
        filmes = response.json()['results']

        print("Sua busca foi realizada com sucesso!")

        return Response(filmes)


# def api_filme_add(request,filme_id):
#     if request.method == 'POST':
#         try: 
#             url = "https://moviesdatabase.p.rapidapi.com/titles/{filme_id}}"
#             response = requests.get(url, headers=headers, params=querystring)
#             filme = response.json()['results']
#             print(filme)
#             if filme['primaryImage'] is not None:
#                 capa = filme['primaryImage']['url']
#             else:
#                 capa = "https://via.placeholder.com/300x200?text=Imagem+N%C3%A3o+Dispon%C3%ADvel/"
#                 title = filme['titleText']['text']
#                 year = filme['releaseYear']['year']
#             Filme.objects.create(id=filme_id,capa=capa,title=title['title'], year=year)
#             films = Filme.objects.all()
#             serializer = FilmSerializer(films, many=True)
#             return render(request, 'filmes/index.html', {'filmes': serializer.data})
#             #return Response(serializer.data)
#         except: 
#             films = Filme.objects.all()
#             serializer = FilmSerializer(films, many=True)
#             return render(request, 'filmes/index.html', {'filmes': serializer.data})
#             #return Response(serializer.data)
