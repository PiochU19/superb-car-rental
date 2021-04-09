from django.urls import path

from .views import (
	MakeRentView,
	RentDeleteView,
)

app_name = 'rents'

urlpatterns = [
	path('make/', MakeRentView.as_view(), name='make-rent'),
	path('delete/<int:id>/', RentDeleteView.as_view(), name='make-delete'),
]