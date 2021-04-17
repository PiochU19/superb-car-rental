from django.urls import path

from .views import (
	MakeRentView,
	RentDeleteView,
	RentListView,
)

app_name = 'rents'

urlpatterns = [
	path('make/', MakeRentView.as_view(), name='make-rent'),
	path('delete/<int:id>/', RentDeleteView.as_view(), name='rent-delete'),
	path('', RentListView.as_view(), name='rent-list'),
]