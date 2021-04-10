from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from issues.api.serializers import (
	IssueSerializer,
)
from .models import Issue
from .helpers import send_email_issue_confirmation


class IssueView(APIView):
	"""
	Issues
	"""
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = IssueSerializer(data=request.data)

		if serializer.is_valid():
			issue = serializer.save()

			send_email_issue_confirmation(request, issue.id, issue.email)

			return Response('Issue has been sent', status=status.HTTP_201_CREATED)

		return Response('Something went wrong', status=status.HTTP_400_BAD_REQUEST)