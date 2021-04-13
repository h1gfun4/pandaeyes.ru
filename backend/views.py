from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.base import View

from .models import Back

class BackView(ListView):
    """вывод статей блога """
    model = Back
    queryset = Back.objects.filter(draft=False).order_by("id")[:1]
    template_name = "backend/backendPage.html"

class BackDetailView(DetailView):
    """полное описание статей"""
    model = Back
    slug_field = "url"