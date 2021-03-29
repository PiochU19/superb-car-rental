from rest_framework import serializers
from account.models import User


class UserRegisterSerializer(serializers.ModelSerializer):
	"""
	User registration by API
	"""
	class Meta:
		model = User
		fields = ('email', 'password')