from django.urls import path

from .views import (
	CarListView,
	CarDetailView,
	CarDeleteView,
)


app_name = 'car'


urlpatterns = [
	path('', CarListView.as_view(), name='cars-list'),
	path('<slug:slug>/', CarDetailView.as_view(), name='car-detail'),
	path('delete/<int:id>/', CarDeleteView.as_view(), name='car-delete'),
]