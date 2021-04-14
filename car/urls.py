from django.urls import path

from .views import (
	CarListView,
	CarDetailView,
	CarDeleteView,
	CarCreateView,
	CarUpdateView
)


app_name = 'car'


urlpatterns = [
	path('', CarListView.as_view(), name='cars-list'),
	path('get/<slug:slug>/', CarDetailView.as_view(), name='car-detail'),
	path('delete/<int:id>/', CarDeleteView.as_view(), name='car-delete'),
	path('create/', CarCreateView.as_view(), name='car-create'),
	path('update/', CarUpdateView.as_view(), name='car-update'),
]