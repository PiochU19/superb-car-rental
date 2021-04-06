from django.contrib import admin
from .models import (
	Rent,
)

@admin.register(Rent)
class RentAdmin(admin.ModelAdmin):
	"""
	Custom Rent Model Admin
	"""
	model = Rent
	search_field = ('user', 'car',)
	ordering = ('user', 'rent_starts', 'rent_ends',)