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
	list_display = ('user', 'car', 'rent_starts', 
					'rent_ends', 'additional_insurance', 'price',)
	fieldsets = (
		('User', {'fields': ('slug', 'user',)}),
		('Car', {'fields': ('car',)}),
		('Date', {'fields': ('rent_starts', 'rent_ends',)}),
		('Finance', {'fields': ('price', 'additional_insurance',)}),
	)