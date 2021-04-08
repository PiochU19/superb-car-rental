from django.urls import path

from .views import (
	MakeRentView,
	RentView
)

app_name = 'rents'

urlpatterns = [
	path('make/', MakeRentView.as_view(), name='make-rent'),
	path('rent/', RentView.as_view(), name='asdsad'),
]