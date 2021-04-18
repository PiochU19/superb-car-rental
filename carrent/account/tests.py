from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse

from carrent.account.models import (
	Client,
	User,
)


class TestAccountViews(APITestCase):

	@classmethod
	def setUpTestData(cls):
		"""
		Mock User objects
		"""
		user = User.objects.create_user(
			email='c@c.com',
			password='client',
			is_active=True,
			is_client=True
		)

		Client.objects.create(
			user=user,
			driver_license='KEK 123',
			phone_number='123123123',
			birth_day='2000-10-01',
			city='Los Angeles',
			street='Street',
			street_number='123F',
			postal_code='24-220',
		)

		User.objects.create_user(
			email='e@e.com',
			password='employee',
			is_active=True,
			is_employee=True
		)

		User.objects.create_superuser(
			email='a@a.com',
			password='admin',
		)

	def test_register_client_view(self):
		"""
		test RegisterClientView
		"""
		data = {
			'email': 'test@test.com',
			'first_name': 'test',
			'last_name': 'test',
			'password': 'Testtest12!',
			'client': {
				'driver_license': 'ABC 123',
				'city': 'New York',
				'street': 'Street',
				'street_number': '123F',
				'postal_code': '24-200',
				'phone_number': '123456789',
				'birth_day': '2021-09-24'
			}
		}
		url = reverse('account:register-client')
		response = self.client.post(url, data, format='json')
		self.assertEqual(response.status_code, 201)

		user = User.objects.get(email='test@test.com')
		self.assertEqual(user.is_active, False)
		self.assertEqual(user.is_client, True)
		self.assertEqual(user.is_employee, False)

	def test_register_client_view_weak_password(self):
		"""
		test RegisterClientView
		test should fail because of weak pass
		"""
		data = {
			'email': 'test@test.com',
			'first_name': 'test',
			'last_name': 'test',
			'password': 'test',
			'client': {
				'driver_license': 'ABC 123',
				'city': 'New York',
				'street': 'Street',
				'street_number': '123F',
				'postal_code': '24-200',
				'phone_number': '123456789',
				'birth_day': '2021-09-24'
			}
		}
		url = reverse('account:register-client')
		response = self.client.post(url, data, format='json')
		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data, 'Your password is too weak')

	def test_register_client_view_should_fail(self):
		"""
		test RegisterClientView
		test should fail
		"""
		data = {
			'email': 'c@c.com',
			'first_name': 'test',
			'last_name': 'test',
			'password': 'Testtest12!',
		}
		url = reverse('account:register-client')
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 400)

	def test_register_employee_view(self):
		"""
		test RegisterEmployeeView
		"""
		data = {
			'email': 'test@test.com',
			'first_name': 'test',
			'last_name': 'test',
			'password': 'Testtest12!',
		}
		url = reverse('account:register-employee')

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
		self.assertEqual(response.status_code, 403)

		## admin
		user = User.objects.get(pk=3)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 201)

		user = User.objects.get(email='test@test.com')
		self.assertEqual(user.is_employee, True)
		self.assertEqual(user.is_superuser, False)

	def test_register_employee_view_weak_password(self):
		"""
		test RegisterEmployeeView
		test should fail because of weak pass
		"""
		data = {
			'email': 'test@test.com',
			'first_name': 'test',
			'last_name': 'test',
			'password': 'test',
		}
		url = reverse('account:register-employee')
		user = User.objects.get(pk=3)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data, 'Password is too weak')

	def test_register_employee_view_should_fail(self):
		"""
		test RegisterEmployeeView
		test should fail
		"""
		data = {
			'email': 'e@e.com',
			'first_name': 'test',
			'last_name': 'test',
			'password': 'Testtest12!',
		}
		url = reverse('account:register-employee')
		user = User.objects.get(pk=3)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 400)

	def test_user_permissions_view(self):
		"""
		test UserPemissionsView
		"""
		url = reverse('account:user-permissions')

		## client
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data['is_client'], True)
		self.assertEqual(response.data['is_employee'], False)
		self.assertEqual(response.data['is_superuser'], False)

		## employee
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data['is_client'], False)
		self.assertEqual(response.data['is_employee'], True)
		self.assertEqual(response.data['is_superuser'], False)

		## admin
		user = User.objects.get(pk=3)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data['is_client'], False)
		self.assertEqual(response.data['is_employee'], True)
		self.assertEqual(response.data['is_superuser'], True)

	def test_user_id_view(self):
		"""
		test UserIdView
		"""
		url = reverse('account:user-id')
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data['id'], 1)

	def test_password_change_request_view(self):
		"""
		test PasswordChangeRequestView
		"""
		data = {
			'email': 'c@c.com',
		}
		url = reverse('account:password-change-request')
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 200)

	def test_password_change_request_view_should_fail(self):
		"""
		test PasswordChangeRequestView
		test should fail
		"""
		data = {
			'email': 'casdasdasdasdasdasdasd@c.com',
		}
		url = reverse('account:password-change-request')
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 400)

	def test_client_detail_view(self):
		"""
		test ClientDetailView
		"""
		url = reverse('account:client-detail')
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data['client']['postal_code'], '24-220')
		self.assertEqual(response.data['client']['city'], 'Los Angeles')
		self.assertEqual(response.data['client']['birth_day'], '2000-10-01')
		self.assertEqual(response.data['client']['street'], 'Street')

	def test_client_update_view(self):
		"""
		test ClientUpdateView
		"""
		url = reverse('account:client-update')
		data = {
			'user': 1,
			'phone_number': '987654321',
			'birth_day': '2003-07-19',
			'city': 'Lublin',
			'street': 'Kwiatowa',
			'street_number': '997',
			'postal_code': '00-001',
		}
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.put(url, data)
		self.assertEqual(response.status_code, 200)
		client = Client.objects.get(user=1)
		self.assertEqual(client.postal_code, '00-001')
		self.assertEqual(client.city, 'Lublin')
		self.assertEqual(str(client.birth_day), '2003-07-19')
		self.assertEqual(client.street, 'Kwiatowa')
		self.assertEqual(client.phone_number, '987654321')

	def test_client_update_view_should_fail(self):
		"""
		test ClientUpdateView
		test shoudl_fail
		"""
		url = reverse('account:client-update')
		data = {
			'phone_number': '987654321',
			'birth_day': '2003-07-19',
			'city': 'Lublin',
			'street': 'Kwiatowa',
			'street_number': '997',
			'postal_code': '00-001',
		}
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.put(url, data)
		self.assertEqual(response.status_code, 400)

	def test_client_list_view(self):
		"""
		test ClientListView
		"""
		url = reverse('account:client-list')

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

	def test_client_delete_view(self):
		"""
		test ClientDeleteView
		"""
		url = reverse('account:client-delete', kwargs={'id': 1})

		## client
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 403)

		## employee
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 204)

		url = reverse('account:client-delete', kwargs={'id': 2})

		## employee
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 403)

		## admin
		user = User.objects.get(pk=3)
		self.client.force_authenticate(user)
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 204)

	def test_client_delete_view_should_fail(self):
		"""
		test ClientDeleteView
		test should fail
		"""
		url = reverse('account:client-delete', kwargs={'id': 123234234})

		user = User.objects.get(pk=3)
		self.client.force_authenticate(user)
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 400)

	def test_employee_list_view(self):
		"""
		test EmployeeListView
		"""
		url = reverse('account:employee-list')

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
		self.assertEqual(response.status_code, 403)

		## admin
		user = User.objects.get(pk=3)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)


class TestUserModel(TestCase):

	@classmethod
	def setUpTestData(cls):
		"""
		Mock User object
		"""

		User.objects.create_user(
			first_name='Name',
			last_name='Surname',
			email='c@c.com',
			password='password',
		)

	def test_user_slug_field(self):
		"""
		test if slug is made correctly
		"""
		user = User.objects.get(pk=1)
		self.assertEqual(str(user), 'Name: Name Surname e-mail: c@c.com')