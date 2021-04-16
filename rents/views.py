from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from carrent.permissions import IsEmployee
from .models import Rent
from rents.api.serializers import (
	MakeRentSerializer,
	RentSerializer,
)

## Import functions for validations
from rents.helpers import (
	table_based_on_two_dates,
	finding_collision,
	create_table,
	parse_date,
)
from account.api.serializers import RentListSerializer


class MakeRentView(APIView):
	"""
	View for renting car
	"""
	permission_classes = [permissions.AllowAny]
	def post(self, request):
		rents = Rent.objects.filter(car=request.data['car']).values_list('rent_starts', 'rent_ends')
		rent_days = create_table(rents)

		potential_rent_days = table_based_on_two_dates(
			parse_date(request.data['rent_starts']),
			parse_date(request.data['rent_ends'])
		)

		if finding_collision(rent_days, potential_rent_days):

			serializer = MakeRentSerializer(data=request.data)

			if serializer.is_valid():
				serializer.save()

				return Response("Rent made", status=status.HTTP_201_CREATED)

			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

		return Response("This car is booked on this date", status=status.HTTP_400_BAD_REQUEST)


class RentDeleteView(APIView):
	"""
	View deleting rent by ID
	"""
	def get_object(self, id):
		return Rent.objects.get(pk=id)

	def delete(self, request, id):
		rent = self.get_object(id)
		user = request.user

		if rent.user == user or user.is_employee:
			rent.delete()

			return Response(status=status.HTTP_204_NO_CONTENT)

		return Response(status=status.HTTP_403_FORBIDDEN)


class RentListView(APIView):
	"""
	List of all rents
	"""
	permission_classes = [permissions.IsAuthenticated, IsEmployee]

	def get(self, request):
		queryset = Rent.objects.all()

		serializer = RentListSerializer(queryset, many=True)

		return Response(serializer.data)