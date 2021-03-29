from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from account.api.serializers import (
	RegisterClientSerializer,
	RegisterEmployeeSerializer,
)
from .models import User


class RegisterClientView(APIView):
	"""
	Client Registration
	"""
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
	def get(self, request, uidb64, token):
			try:
				uid = force_text(urlsafe_base64_decode(uidb64))
				user = User.objects.get(pk=uid)
			except (TypeError, ValueError, OverflowError, User.DoesNotExist):
				user = None

			if user is not None and token_generator.check_token(user, token):
				user.is_active = True
				user.save()

				return redirect('https://facebook.com')
			else:
				return HttpResponse('https://error404.com')