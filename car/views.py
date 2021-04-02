from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from car.api.serializers import (
	CarListSerializer,
	CarSlugListSerializer
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


class CarSlugListView(APIView):
	"""
	List of all car slugs
	"""
	permission_classes = [permissions.AllowAny]

	def get(self, request):

		queryset = Car.objects.all()
		serializer = CarSlugListSerializer(queryset, many=True)

		return Response(serializer.data)