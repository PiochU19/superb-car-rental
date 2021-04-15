from django.urls import path
from .views import (
	IssueCreateView,
	IssueListView,
	IssueGetView,
	IssueResponseView,
)

app_name = 'issues'


urlpatterns = [
	path('make/', IssueCreateView.as_view(), name='issue-make'),
	path('list/', IssueListView.as_view(), name='issue-list'),
	path('<int:id>/', IssueGetView.as_view(), name='issue-get'),
	path('response/', IssueResponseView.as_view(), name='issue-response'),
]