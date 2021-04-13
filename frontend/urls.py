from django.urls import path

from .import views

urlpatterns = [
    path('', views.FrontView.as_view(),),
    path("<slug:slug>/", views.FrontDetailView.as_view(), name='front_namber'),
]