from django.urls import path, include
from .import views

urlpatterns = [
    path('', views.ArticlesView.as_view(), name='index'),
]