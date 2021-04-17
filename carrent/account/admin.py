from django.contrib import admin
from .models import (
	User,
	Client,
)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
	"""
	Custom User Model Admin
	"""
	model = User
	search_fields = ('first_name', 'last_name',)
	list_filter = ('email', 'first_name', 'last_name', 'is_active',
					'is_client', 'is_employee',)
	ordering = ('is_active', 'first_name', 'last_name')
	list_display = ('first_name', 'last_name', 'email',
					'is_active', 'is_client', 'is_employee',)
	fieldsets = (
		('Personal Info', {'fields': ('first_name', 'last_name',)}),
		('Contact', {'fields': ('email',)}),
		('Permissions', {'fields': ('is_active', 'is_client', 'is_employee', 'is_superuser',)}),
	)

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
	"""
	Custom Client Model Admin
	"""
	model = Client
	search_fields = ('city',)
	list_filter = ('city', 'birth_day',)
	ordering = ('city', 'user',)
	list_display = ('user', 'city', 'birth_day',)
	fieldsets = (
		('Info', {'fields': ('user', 'driver_license', 'phone_number', 'birth_day',)}),
		('Adress', {'fields': ('city', 'street', 'street_number', 'postal_code',)}),
	)