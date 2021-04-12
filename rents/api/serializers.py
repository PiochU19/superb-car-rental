from rest_framework import serializers
from account.models import (
	User,
)
from rents.models import (
	Rent,
)
from car.api.serializers import CarSerializer


class MakeRentSerializer(serializers.ModelSerializer):
	"""
	Renting Car through API
	"""
	class Meta:
		model = Rent
		fields = ('user', 'car', 'rent_starts', 'rent_ends', 
					'additional_insurance', 'price',)

	def create(self, validated_data):
		"""
		Make rent method
		"""
		rent = Rent.objects.create(**validated_data)

		rent.save()

		return rent


class RentSerializer(serializers.ModelSerializer):
	"""
	Rent Serializer
	"""
	class Meta:
		model = Rent
		fields = ('id', 'car', 'rent_starts', 'rent_ends',
					'additional_insurance', 'price')

	def to_representation(self, instance):
		"""
		displaying all car data
		instead of id
		"""
		rep = super().to_representation(instance)
		rep['car'] = CarSerializer(instance.car).data
		return rep