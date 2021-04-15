from django.contrib import admin
from .models import Issue


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
	"""
	Custom Issue Model Admin
	"""
	model = Issue
	search_field = ('id', 'email', 'title',)
	ordering = ('responded',)
	list_display = ('title', 'email', 'responded',)
	fieldsets = (
		('Issue', {'fields': ('title', 'message',)}),
		('Info', {'fields': ('email', 'responded',)}),
	)