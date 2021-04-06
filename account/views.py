from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from account.api.serializers import (
	RegisterClientSerializer,
	RegisterEmployeeSerializer,
	UserPermissionsSerializer,
	UserIdSerializer
)
from .models import User


class RegisterClientView(APIView):
	"""
	Client Registration
	"""
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		data = request.data

		serializer = RegisterClientSerializer(data=data)

		if serializer.is_valid():
			serializer.save()

			user = User.objects.get(email=data['email'])
			send_mail_confirmation(request, user, data['email'])

			return Response("We've sent you email", status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterEmployeeView(APIView):
	"""
	Employee Registration
	"""
	def post(self, request):
		data = request.data

		serializer = RegisterEmployeeSerializer(data=data)

		if serializer.is_valid():
			serializer.save()

			return Response("Account created", status=status.HTTP_201_CREATED)

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
	"""
	def get(self, request):
		 serializer = UserIdSerializer(request.user)

		 return Response(serializer.data)


# Imports for email confirmation
from django.views import View
from account.helpers import send_mail_confirmation
from account.models import User
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from .tokens import token_generator
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