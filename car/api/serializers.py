from rest_framework import serializers
from car.models import (
	Car,
)


class CarListSerializer(serializers.ModelSerializer):
	"""
	Serializer for list of cars
	without related images
	"""
	class Meta:
		model = Car
		fields = ('slug', 'brand', 'model', 'generation',
					'engine', 'fuel_type', 'hourse_power', 'main_image',)


class CarDetailSerializer(serializers.ModelSerializer):
	"""
	Serializer for dynamic
	Next page returning detail
	data about specific car
	"""
	class Meta:
		model = Car
		fields = ('id', 'brand', 'model', 'generation', 
					'engine', 'fuel_type', 'year_of_production', 
					'body_type', 'hourse_power', 'main_image', 
					'price_per_day',)