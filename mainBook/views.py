from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.base import View

from .models import Direction

class DirectionView(ListView):
    """вывод статей блога """
    model = Direction
    queryset = Direction.objects.filter(draft=False)
    template_name = "mainBook/bookPage.html"
