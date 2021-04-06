from django.http import HttpResponse
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from car.api.serializers import (
	CarListSerializer,
	CarDetailSerializer,
)

from car.models import (
	Car,
)


class CarListView(APIView):
	"""
	List of all cars 
	as a result
	"""
	permission_classes = [permissions.AllowAny]

	def get(self, request):

		queryset = Car.objects.all()
		serializer = CarListSerializer(queryset, many=True)

		return Response(serializer.data)


class CarDetailView(APIView):
	"""
	All detail about
	specific car
	"""
	def get(self, request, slug):

		queryset = Car.objects.get(slug=slug)
		serializer = CarDetailSerializer(queryset, many=False)

		return Response(serializer.data)
