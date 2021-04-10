from django.urls import path
from .views import (
	IssueView,
)

app_name = 'issues'


urlpatterns = [
	path('make/', IssueView.as_view(), name='issue-make'),
]