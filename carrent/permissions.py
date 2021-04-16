from rest_framework import permissions


class IsEmployee(permissions.BasePermission):
	"""
	Permission for employee
	"""
	def has_permission(self, request, view):
		user = request.user

		if user and user.is_authenticated:
			return user.is_employee


class IsSuperuser(permissions.BasePermission):
	"""
	Permission for admin
	"""
	def has_permission(self, request, view):
		user = request.user

		if user and user.is_authenticated:
			return user.is_superuser