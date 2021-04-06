from django.urls import path
from .views import (
	RegisterClientView,
	RegisterEmployeeView,
	EmailActivateView,
	UserPermissionsView,
	UserIdView
)

app_name = 'account'

urlpatterns = [
	path('api/user/client/register/', RegisterClientView.as_view(), name='register-client'),
	path('api/user/employee/register/', RegisterEmployeeView.as_view(), name='register-employee'),
	path('api/user/permissions/', UserPermissionsView.as_view(), name='user-permissions'),
	path('api/user/id/', UserIdView.as_view(), name='user-id'),

	path('activate/<uidb64>/<token>', EmailActivateView.as_view(), name='email-activate'),
]