from django.urls import path

from .views import (
	CarListView,
	CarSlugListView,
)


app_name = 'car'


urlpatterns = [
	path('', CarListView.as_view(), name='cars-list'),
	path('slugs/', CarSlugListView.as_view(), name='cars-slug'),
]