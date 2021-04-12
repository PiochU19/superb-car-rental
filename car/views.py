from django.http import HttpResponse
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from car.api.serializers import (
	CarSerializer,
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
		serializer = CarSerializer(queryset, many=True)

		return Response(serializer.data)


class CarDetailView(APIView):
	"""
	All detail about
	specific car
	"""
	def get(self, request, slug):

		queryset = Car.objects.get(slug=slug)
		serializer = CarSerializer(queryset, many=False)

		return Response(serializer.data)

class CarDeleteView(APIView):
	"""
	Delete car by given ID
	"""
	def get_object(self, id):
		return Car.objects.get(pk=id)

	def delete(self, request, id):
		car = self.get_object(id)
		user = request.user

		if user.is_employee or user.is_superuser:
			car.delete()

			return Response(status=status.HTTP_204_NO_CONTENT)

		return Response(status=status.HTTP_400_BAD_REQUEST)