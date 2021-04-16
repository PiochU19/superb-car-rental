from django.urls import path
from .views import (
	RegisterClientView,
	RegisterEmployeeView,
	UserPermissionsView,
	UserIdView,
	ClientDetailView,
	ClientUpdateView,
	ClientListView,
	ClientDeleteView,
	EmployeeListView,

	EmailActivateView,
	PasswordChangeView,
	PasswordChangeRequestView,
)

app_name = 'account'

urlpatterns = [
	path('user/client/register/', RegisterClientView.as_view(), name='register-client'),
	path('user/employee/register/', RegisterEmployeeView.as_view(), name='register-employee'),
	path('user/permissions/', UserPermissionsView.as_view(), name='user-permissions'),
	path('user/id/', UserIdView.as_view(), name='user-id'),
	path('user/client/', ClientDetailView.as_view(), name='client-detail'),
	path('user/client/update/', ClientUpdateView.as_view(), name='client-update'),
	path('user/clients/', ClientListView.as_view(), name='client-list'),
	path('user/delete/<int:id>/', ClientDeleteView.as_view(), name='client-delete'),
	path('user/employees/', EmployeeListView.as_view(), name='employee-list'),

	path('activate/<uidb64>/<token>', EmailActivateView.as_view(), name='email-activate'),
	path('passwordchange/', PasswordChangeView.as_view(), name='password-change'),
	path('passwordchange/request/', PasswordChangeRequestView.as_view(), name='password-change-request'),
]