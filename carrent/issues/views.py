from rest_framework import status, permissions
from carrent.permissions import IsEmployee
from rest_framework.response import Response
from rest_framework.views import APIView
from carrent.issues.api.serializers import (
	IssueSerializer,
)
from .models import Issue
from .helpers import (
	send_email_issue_confirmation,
	send_issue_response,
)


class IssueCreateView(APIView):
	"""
	Issue Create
	"""
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = IssueSerializer(data=request.data)

		if serializer.is_valid():
			issue = serializer.save()

			send_email_issue_confirmation(request, issue.id, issue.email)

			return Response('Issue has been sent', status=status.HTTP_201_CREATED)

		return Response('Something went wrong', status=status.HTTP_400_BAD_REQUEST)


class IssueListView(APIView):
	"""
	Issues List
	"""
	permission_classes = [permissions.IsAuthenticated, IsEmployee]

	def get(self, request):
		queryset = Issue.objects.all()

		serializer = IssueSerializer(queryset, many=True)

		return Response(serializer.data)


class IssueGetView(APIView):
	"""
	Get Issue by ID
	"""
	permission_classes = [permissions.IsAuthenticated, IsEmployee]

	def get(self, request, id):
		issue = Issue.objects.get(pk=id)

		serializer = IssueSerializer(issue, many=False)

		return Response(serializer.data)


class IssueResponseView(APIView):
	"""
	Handles issue response sending
	"""
	permission_classes = [permissions.IsAuthenticated, IsEmployee]

	def post(self, request):
		issue = Issue.objects.get(pk=request.data['id'])
		user = request.user

		if issue:
			send_issue_response(
				request,
				issue.id,
				request.data['response'],
				issue.email,
				user.first_name,
				user.last_name
			)
			issue.responded = True
			issue.save()

		return Response(status=status.HTTP_200_OK)