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
	permission_classes = [permissions.AllowAny]

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
			car.main_image.delete()
			car.delete()

			return Response(status=status.HTTP_204_NO_CONTENT)

		return Response(status=status.HTTP_400_BAD_REQUEST)


class CarCreateView(APIView):
	"""
	Creating car
	"""
	def post(self, request):

		serializer = CarSerializer(data=request.data)

		if serializer.is_valid():
			serializer.save()

			return Response(status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CarUpdateView(APIView):
	"""
	Updating car
	"""
	def put(self, request):

		data = request.data

		id = data['id']
		data._mutable = True
		
		car = Car.objects.get(pk=id)

		if not data['main_image']:
			data['main_image'] = car.main_image
		else:
			car.main_image.delete()

		data._mutable = False

		serializer = CarSerializer(car, data=data)

		if serializer.is_valid():
			serializer.save()

			return Response("Car updated", status=status.HTTP_200_OK)

		return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)