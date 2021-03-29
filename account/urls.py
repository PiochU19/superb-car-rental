from django.urls import path
from .views import (
	RegisterClientView,
	RegisterEmployeeView,
	EmailActivateView,
)

app_name = 'account'

urlpatterns = [
	path('api/user/client/register/', RegisterClientView.as_view(), name='register-client'),
	path('api/user/employee/register/', RegisterEmployeeView.as_view(), name='register-employee'),

	path('activate/<uidb64>/<token>', EmailActivateView.as_view(), name='email-activate'),
]