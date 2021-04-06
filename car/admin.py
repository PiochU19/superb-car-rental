from django.contrib import admin
from .models import (
	Car,
	CarImage,
)

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
	"""
	Custom Car Model Admin
	"""
	model = Car
	search_field = ('brand', 'model', 'body_type', 'fuel_type',
					'engine', 'hourse_power', 'year_of_production', 'price_per_day',)
	ordering = ('brand', 'model', 'year_of_production',)
	list_display = ('brand', 'model', 'year_of_production', 'engine',
					'fuel_type', 'hourse_power', 'body_type', 'price_per_day',)
	fieldsets = (
		('Car info', {'fields': ('brand', 'model', 'generation', 'year_of_production', 'body_type', 'price_per_day',)}),
		('Engine', {'fields': ('engine', 'fuel_type', 'hourse_power',)}),
		('Image', {'fields': ('main_image',)}),
	)


admin.site.register(CarImage)