from rest_framework import serializers
from car.models import Car


class CarSerializer(serializers.ModelSerializer):
	"""
	Car Serializer
	"""
	class Meta:
		model = Car
		fields = ('id', 'slug', 'brand', 'model', 'generation', 
					'engine', 'fuel_type', 'year_of_production', 
					'body_type', 'hourse_power', 'main_image', 
					'price_per_day',)