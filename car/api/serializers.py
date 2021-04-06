from rest_framework import serializers
from car.models import (
	Car,
	CarImage,
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


class CarImageSerializer(serializers.ModelSerializer):
	"""
	Serializer for all related
	images to specific car
	"""
	class Meta:
		model = CarImage
		fields = ('image',)