from django.urls import path

from .import views

urlpatterns = [
    path('', views.ArticlesView.as_view(),),
    path("<slug:slug>/", views.ArticlesDetailView.as_view(), name='article_namber'),
]