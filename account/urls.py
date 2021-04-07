from django.urls import path
from .views import (
	RegisterClientView,
	RegisterEmployeeView,
	UserPermissionsView,
	UserIdView,

	EmailActivateView,
	PasswordChangeView,
	PasswordChangeRequestView,
)

app_name = 'account'

urlpatterns = [
	path('api/user/client/register/', RegisterClientView.as_view(), name='register-client'),
	path('api/user/employee/register/', RegisterEmployeeView.as_view(), name='register-employee'),
	path('api/user/permissions/', UserPermissionsView.as_view(), name='user-permissions'),
	path('api/user/id/', UserIdView.as_view(), name='user-id'),

	path('activate/<uidb64>/<token>', EmailActivateView.as_view(), name='email-activate'),
	path('api/passwordchange/', PasswordChangeView.as_view(), name='password-change'),
	path('api/passwordchange/request/', PasswordChangeRequestView.as_view(), name='password-change-request'),
]