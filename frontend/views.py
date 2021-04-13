from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.base import View

from .models import Front

class FrontView(ListView):
    """вывод статей блога """
    model = Front
    queryset = Front.objects.filter(draft=False).order_by("id")[:1]
    template_name = "frontend/frontendPage.html"


class FrontDetailView(DetailView):
    """полное описание статей"""
    model = Front
    slug_field = "url"