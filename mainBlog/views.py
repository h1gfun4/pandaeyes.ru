from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.base import View

from .models import Article

class ArticlesView(ListView):
    """вывод статей блога """
    model = Article
    queryset = Article.objects.filter(draft=False)
    template_name = "mainBlog/blogPage.html"
    paginate_by = 2


class ArticlesDetailView(DetailView):
    """полное описание статей"""
    model = Article
    slug_field = "url"