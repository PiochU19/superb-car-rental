from django.urls import path

from .views import (
	CarListView,
)


app_name = 'car'


urlpatterns = [
	path('', CarListView.as_view(), name='cars-list'),
]