from django.urls import path
from .views import (
	RegisterClientView,
)

app_name = 'account'

urlpatterns = [
	path('user/client/register/', RegisterClientView.as_view(), name='register-client'),
]