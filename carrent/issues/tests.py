from rest_framework.test import APITestCase
from django.urls import reverse

from carrent.issues.models import Issue
from carrent.account.models import User


class TestIssueViews(APITestCase):

	@classmethod
	def setUpTestData(cls):
		"""
		mock Issue obj
		"""
		Issue.objects.create(
			title='title',
			email='genagelt@dekorationideen.me',
			message='message',
		)

		User.objects.create_user(
			email='c@c.com',
			password='client'
		)

		User.objects.create_user(
			email='e@e.com',
			password='employee',
			is_employee=True
		)

	def test_issue_create_view(self):
		"""
		test IssueCreateView
		"""
		url = reverse('issues:issue-make')
		data = {
			'title': 'test title',
			'email': 'genagelt@dekorationideen.me',
			'message': 'test message',
		}
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 201)

	def test_issue_create_view_should_fail(self):
		"""
		test IssueCreateView
		test should fail
		"""
		url = reverse('issues:issue-make')
		response = self.client.post(url)
		self.assertEqual(response.status_code, 400)

	def test_issue_list_view(self):
		"""
		test IssueListView
		"""
		url = reverse('issues:issue-list')

		## unauth
		response = self.client.get(url)
		self.assertEqual(response.status_code, 401)

		## client
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 403)

		## employee
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)

	def test_issue_get_view(self):
		"""
		test IssueGetView
		"""
		url = reverse('issues:issue-get', kwargs={'id': 1})

		## unauth
		response = self.client.get(url)
		self.assertEqual(response.status_code, 401)

		## client
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 403)

		## employee
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)

	def test_issue_get_view_should_fail(self):
		"""
		test IssueGetView
		test should fail
		"""
		url = reverse('issues:issue-get', kwargs={'id': 2})
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 400)

	def test_issue_response_view(self):
		"""
		test IssueResponseView
		"""
		data = {
			'id': 1,
			'response': 'response'
		}
		url = reverse('issues:issue-response')

		## unauth
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 401)

		## client
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 403)

		## employee
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 200)

		issue = Issue.objects.get(pk=1)
		self.assertEqual(issue.responded, True)

	def test_issue_response_view_shoudl_fail(self):
		"""
		test IssueResponseView
		test should fail
		"""
		data = {
			'id': 10,
			'response': 'response'
		}
		url = reverse('issues:issue-response')

		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 400)