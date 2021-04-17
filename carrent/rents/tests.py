from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse

from carrent.rents.models import Rent
from carrent.car.models import Car
from carrent.account.models import User


class TestRentViews(APITestCase):

	@classmethod
	def setUpTestData(cls):
		"""
		mock Rent obj
		"""
		car = Car.objects.create(
			brand='Volkswagen',
			model='Passat',
			generation='B6',
			engine=1.9,
			year_of_production=2006,
			body_type='Station wagon',
			fuel_type='Diesel',
			hourse_power=105,
			price_per_day=300,
		)

		user = User.objects.create_user(
			email='t@t.com',
			password='test',
			is_active=True,
			is_client=True,
		)

		user2 = User.objects.create_user(
			email='tt@tt.com',
			password='testtest',
			is_active=True,
			is_client=True,
		)

		User.objects.create_superuser(
			email='r@r.com',
			password='admin',
		)

		Rent.objects.create(
			car=car,
			user=user,
			rent_starts='2021-09-25',
			rent_ends='2021-09-27',
			additional_insurance=True,
			price=500
		)

		Rent.objects.create(
			car=car,
			user=user2,
			rent_starts='2021-10-25',
			rent_ends='2021-10-27',
			additional_insurance=True,
			price=500
		)

	def test_make_rent_view(self):
		"""
		tests MakeRentView
		"""
		user = User.objects.get(pk=1)
		data = {
			'user': 1,
			'car': 1,
			'rent_starts': '2021-09-28',
			'rent_ends': '2021-09-30',
			'additional_insurance': False,
			'price': 300
		}

		url = reverse('rents:make-rent')
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 201)

	def test_make_rent_view_with_collision(self):
		"""
		tests MakeRentView
		test shoudl fail because of collision
		"""
		user = User.objects.get(pk=1)
		data = {
			'user': 1,
			'car': 1,
			'rent_starts': '2021-09-25',
			'rent_ends': '2021-09-30',
			'additional_insurance': False,
			'price': 300
		}

		url = reverse('rents:make-rent')
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 400)

	def test_make_rent_view_should_fail(self):
		"""
		tests MakeRentView
		test should fail
		"""
		user = User.objects.get(pk=1)
		data = {
			'user': 2,
			'car': 1,
			'rent_starts': '2021-09-28',
			'rent_ends': '2021-09-30',
			'additional_insurance': False,
			'price': 300
		}

		url = reverse('rents:make-rent')
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 403)

		user = User.objects.get(pk=3)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 403)

	def test_rent_delete_view(self):
		"""
		tests RentDeletView
		"""
		url = reverse('rents:rent-delete', kwargs={'id': 1})

		## unauth
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 401)

		## 2nd user
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 403)

		## auth
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 204)

	def test_rent_delete_view_should_fail(self):
		"""
		tests RentDeleteView
		test should fail
		"""
		url = reverse('rents:rent-delete', kwargs={'id': 10})

		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 400)

	def test_rent_list_view(self):
		"""
		tests RentListView
		"""
		url = reverse('rents:rent-list')

		## unauth
		response = self.client.get(url)
		self.assertEqual(response.status_code, 401)

		## client
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 403)

		## employee
		user = User.objects.get(pk=3)
		self.client.force_authenticate(user)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)


class TestRentModel(TestCase):

	@classmethod
	def setUpTestData(cls):
		"""
		mock Rent obj
		"""
		car = Car.objects.create(
			brand='Volkswagen',
			model='Passat',
			generation='B6',
			engine=1.9,
			year_of_production=2006,
			body_type='Station wagon',
			fuel_type='Diesel',
			hourse_power=105,
			price_per_day=300,
		)

		user = User.objects.create_user(
			email='t@t.com',
			password='test',
			is_active=True,
			is_client=True,
		)

		Rent.objects.create(
			car=car,
			user=user,
			rent_starts='2021-09-25',
			rent_ends='2021-09-27',
			additional_insurance=True,
			price=500
		)

	def test_slug_field(self):
		"""
		tests if slug is made correctly
		"""
		rent = Rent.objects.get(pk=1)
		self.assertEqual(str(rent), 'volkswagen-passat-2006-19-1')