from rest_framework import serializers
from account.models import (
	User,
	Client,
)
from rents.api.serializers import RentSerializer


class ClientSerializer(serializers.ModelSerializer):
	"""
	Client Serializer for future User Registration
	"""
	class Meta:
		model = Client
		fields = ('driver_license', 'city', 'street', 'street_number',
					'postal_code', 'phone_number', 'birth_day')


class RegisterClientSerializer(serializers.ModelSerializer):
	"""
	Client registration by API
	"""
	client = ClientSerializer(many=False)

	class Meta:
		model = User
		fields = ('email', 'first_name', 'last_name', 'password', 'client')
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		"""
		Create method
		"""
		client_data = validated_data.pop('client')

		password = validated_data.pop('password', None)

		user = self.Meta.model(is_active=False, is_client=True, **validated_data)

		if password is not None:
			user.set_password(password)

		user.save()

		Client.objects.create(user=user, **client_data)

		return user


class RegisterEmployeeSerializer(serializers.ModelSerializer):
	"""
	Employee registration by API
	"""
	class Meta:
		model = User
		fields = ('email', 'first_name', 'last_name', 'password',)
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		"""
		Create method
		"""
		password = validated_data.pop('password', None)

		user = self.Meta.model(is_active=True, is_employee=True, is_staff=True, **validated_data)

		if password is not None:
			user.set_password(password)

		user.save()

		return user


class UserPermissionsSerializer(serializers.HyperlinkedModelSerializer):
	"""
	Returning permissions
	"""
	class Meta:
		model = User
		fields = ('is_client', 'is_employee', 'is_superuser',)


class UserIdSerializer(serializers.HyperlinkedModelSerializer):
	"""
	Returning user ID
	"""
	class Meta:
		model = User
		fields = ('id',)


class ClientProfileSerializer(serializers.ModelSerializer):
	"""
	Returning data needed 
	for profile page
	"""
	client = ClientSerializer(many=False)
	user_rent = RentSerializer(many=True)

	class Meta:
		model = User
		fields = ('first_name', 'last_name',
					'email', 'client', 'user_rent',)