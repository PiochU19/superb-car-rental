from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from issues.api.serializers import (
	IssueSerializer,
)


class IssueView(APIView):
	"""
	Issues
	"""
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = IssueSerializer(data=request.data)

		if serializer.is_valid():
			serializer.save()

			return Response('Issue made', status=status.HTTP_201_CREATED)

		return Response('Something went wrong', status=status.HTTP_400_BAD_REQUEST)