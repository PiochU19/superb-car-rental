from rest_framework import serializers
from account.models import (
	User,
	Client,
)


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
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()

		Client.objects.create(user=instance, **client_data)

		return instance