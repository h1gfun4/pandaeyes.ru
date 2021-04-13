from django.views.generic.base import View
from django.shortcuts import render

from mainBlog.models import Article



def index(request):
    return render(request, 'mainApp/homePage.html')


class ArticlesView(View):
    """вывод статей блога на главную"""
    def get(self, request):
        mainApps = Article.objects.filter(draft=False)
        return render(request, "mainApp/homePage.html", {"main_list": mainApps})