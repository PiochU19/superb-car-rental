from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from rents.api.serializers import (
	MakeRentSerializer,
)


class MakeRentView(APIView):
	"""
	View for renting car
	"""
	permission_classes = [permissions.AllowAny]
	def post(self, request):
		serializer = MakeRentSerializer(data=request.data)

		if serializer.is_valid():
			serializer.save()

			return Response("Rent made", status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)