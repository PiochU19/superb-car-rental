from rest_framework import status, permissions
from carrent.permissions import (
		IsEmployee,
		IsSuperuser,
	)
from rest_framework.response import Response
from rest_framework.views import APIView
from carrent.account.api.serializers import (
		RegisterClientSerializer,
		EmployeeSerializer,
		UserPermissionsSerializer,
		UserIdSerializer,
		ClientProfileSerializer,
		ClientUpdateSerializer,
		ClientsSerializer,
	)
from .models import User, Client
from carrent.account.helpers import (
		send_mail_password_reset,
		password_check,
	)
from .tokens import (
		token_generator,
		token_password_reset_generator,
	)


class RegisterClientView(APIView):
	"""
	Client Registration
	"""
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		data = request.data

		serializer = RegisterClientSerializer(data=data)

		if serializer.is_valid():
			if password_check(data['password']):
				serializer.save()

				user = User.objects.get(email=data['email'])
				send_mail_confirmation(request, user, data['email'])

				return Response("We've sent you email", status=status.HTTP_201_CREATED)

			return Response('Your password is too weak', status=status.HTTP_400_BAD_REQUEST)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterEmployeeView(APIView):
	"""
	Employee Registration
	"""
	permission_classes = [permissions.IsAuthenticated, IsSuperuser]
	def post(self, request):
		data = request.data

		serializer = EmployeeSerializer(data=data)

		if serializer.is_valid():
			if password_check(data['password']):
				serializer.save()

				return Response("Account created", status=status.HTTP_201_CREATED)

			return Response('Password is too weak', status=status.HTTP_400_BAD_REQUEST)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPermissionsView(APIView):
	"""
	GET request returning fields: 'is_client',
	'is_employee' and 'is_superuser'
	"""
	def get(self, request):
		serializer = UserPermissionsSerializer(request.user)

		return Response(serializer.data)


class UserIdView(APIView):
	"""
	GET request returning user ID
	of logged user
	"""
	def get(self, request):
		serializer = UserIdSerializer(request.user)

		return Response(serializer.data)

class PasswordChangeRequestView(APIView):
	"""
	POST request sending email
	with link where user can 
	change password
	"""
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		try:
			user = User.objects.get(email=request.data['email'])
		except User.DoesNotExist:
			user = None
		if user:
			send_mail_password_reset(user)

			return Response('Email sent', status=status.HTTP_200_OK)

		return Response('Invalid email', status=status.HTTP_400_BAD_REQUEST)


class ClientDetailView(APIView):
	"""
	GET request returning all
	detail about logged client
	"""
	def get(self, request):
		serializer = ClientProfileSerializer(request.user, context={'request': request})

		return Response(serializer.data)


class ClientUpdateView(APIView):
	"""
	View updating some
	client data
	"""
	def put(self, request):
		"""
		PUT request for update
		"""
		data = request.data

		client = Client.objects.get(user=request.user.id)

		serializer = ClientUpdateSerializer(client, data)

		if serializer.is_valid():
			serializer.save()

			return Response(status=status.HTTP_200_OK)

		return Response('Something went wrong', status=status.HTTP_400_BAD_REQUEST)

	def get(self, request):
		"""
		GET request for get
		user logged in data
		"""
		client = Client.objects.get(user=request.user)

		serializer = ClientUpdateSerializer(client)

		return Response(serializer.data)


class ClientListView(APIView):
	"""
	List of all clients
	"""
	permission_classes = [permissions.IsAuthenticated, IsEmployee]

	def get(self, request):
		queryset = User.objects.filter(is_client=True)
		serializer = ClientsSerializer(queryset, many=True)

		return Response(serializer.data)


class ClientDeleteView(APIView):
	"""
	Deleting client
	"""
	permission_classes = [permissions.IsAuthenticated, IsEmployee]

	def get_object(self, id):
		try:
			return User.objects.get(pk=id)
		except User.DoesNotExist:
			return False

	def delete(self, request, id):
		user = self.get_object(id)
		log_user = request.user

		if user:
			if (user.is_client and log_user.is_employee) or (log_user.is_superuser):
				user.delete()

				return Response(status=status.HTTP_204_NO_CONTENT)

			return Response(status=status.HTTP_403_FORBIDDEN)

		return Response(status=status.HTTP_400_BAD_REQUEST)


class EmployeeListView(APIView):
	"""
	List of all employees
	"""
	permission_classes = [permissions.IsAuthenticated, IsSuperuser]

	def get(self, request):
		queryset = User.objects.filter(is_employee=True)

		serializer = EmployeeSerializer(queryset, many=True)

		return Response(serializer.data)


# Imports for email confirmation
from django.views import View
from .helpers import send_mail_confirmation
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.shortcuts import redirect


class EmailActivateView(View):
	"""
	View where user activates acc
	"""
	permission_classes = [permissions.AllowAny]

	def get(self, request, uidb64, token):
		try:
			uid = force_text(urlsafe_base64_decode(uidb64))
			user = User.objects.get(pk=uid)
		except (TypeError, ValueError, OverflowError, User.DoesNotExist):
			user = None

		if user is not None and token_generator.check_token(user, token):
			user.is_active = True
			user.save()

			return redirect("http://localhost:3000/login")
		else:
			return redirect('https://error404.com')


class PasswordChangeView(APIView):
	"""
	User sending coded ID,
	token and new password
	"""
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		try:
			uid = force_text(urlsafe_base64_decode(request.data['uidb64']))
			user = User.objects.get(pk=uid)
		except (TypeError, ValueError, OverflowError, User.DoesNotExist):
			user = None

		if user is not None and token_password_reset_generator.check_token(user, request.data['token']):
			if password_check(request.data['password']):
				user.set_password(request.data['password'])
				user.save()

				return Response('Password changed', status=status.HTTP_200_OK)

			return Response('Your password is too weak', status=status.HTTP_400_BAD_REQUEST)

		return Response('Something went wrong', status=status.HTTP_400_BAD_REQUEST)