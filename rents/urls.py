from django.urls import path

from .views import (
	MakeRentView,
)

app_name = 'rents'

urlpatterns = [
	path('make/', MakeRentView.as_view(), name='make-rent'),
]