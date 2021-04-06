from rest_framework import serializers
from account.models import (
	User,
)
from car.models import (
	Car,
)
from rents.models import (
	Rent,
)


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