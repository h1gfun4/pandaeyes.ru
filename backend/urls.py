from django.urls import path

from .import views

urlpatterns = [
    path('', views.BackView.as_view(),),
    path("<slug:slug>/", views.BackDetailView.as_view(), name='back_namber'),
]