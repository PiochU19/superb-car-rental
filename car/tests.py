from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse

from .models import Car
from account.models import User

from django.core.files import File


class TestCarView(APITestCase):

	@classmethod
	def setUpTestData(cls):
		"""
		sets 'fake' obj
		"""
		Car.objects.create(
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

		User.objects.create_user(
			email='c@c.com',
			password='client',
			is_active=True,
			is_client=True,
		)
		User.objects.create_user(
			email='e@e.com',
			password='employee',
			is_active=True,
			is_employee=True,
		)

	def test_car_list_view(self):
		"""
		tests CarListView
		"""
		url = reverse('car:cars-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)

	def test_car_detail_view(self):
		"""
		tests CarDetailView
		"""
		url = reverse('car:car-detail', kwargs={'slug':'volkswagen-passat-2006-19'})
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)

	def test_car_detail_view_should_fail(self):
		"""
		tests CarDetailView
		test should fail
		"""
		url = reverse('car:car-detail', kwargs={'slug':'olkswagen-passat-2006-19'})
		response = self.client.get(url)
		self.assertEqual(response.status_code, 400)

	def test_car_delete_view(self):
		"""
		tests CarDeleteView
		"""
		url = reverse('car:car-delete', kwargs={'id':1})

		## unauth
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 401)

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

	def test_car_delete_view_should_fail(self):
		"""
		tests CarDeleteView
		test should fail
		"""
		url = reverse('car:car-delete', kwargs={'id':2})
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.delete(url)
		self.assertEqual(response.status_code, 400)

	def test_car_create_view(self):
		"""
		tests CarCreateView
		"""
		url = reverse('car:car-create')
		data = {
			'brand': 'Audi',
			'model': 'A6',
			'generation': 'C7',
			'engine': 3.2,
			'year_of_production': 2012,
			'body_type': 'Sedan',
			'fuel_type': 'Petrol',
			'hourse_power': 212,
			'price_per_day': 200,
		}

		## unauth
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 401)

		## client
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 403)

		## employee
		data['main_image'] = File(open('media/test/test.jpg', 'rb'))
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 201)

		## deleting image
		car = Car.objects.get(pk=2)
		car.main_image.delete()

	def test_car_create_view_shoudl_fail(self):
		"""
		tests CarCreateView
		test shoudl fail
		"""
		url = reverse('car:car-create')
		data = {
			'brand': 'Audi',
			'model': 'A6',
			'generation': 'C7',
			'engine': 3.2,
			'year_of_production': 2012,
			'body_type': 'Sedan',
			'fuel_type': 'Petrol',
			'hourse_power': 212,
			'price_per_day': 200,
		}

		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, 400)

	def test_car_update_view(self):
		"""
		tests CarUpdateView
		"""
		url = reverse('car:car-update')
		data = {
			'id': 1,
			'brand': 'Audi',
			'model': 'A4',
			'generation': 'B8',
			'engine': 2.4,
			'year_of_production': 2017,
			'body_type': 'Sedan',
			'fuel_type': 'Petrol',
			'hourse_power': 212,
			'price_per_day': 200,
		}

		## unauth
		response = self.client.put(url, data)
		self.assertEqual(response.status_code, 401)

		## client
		user = User.objects.get(pk=1)
		self.client.force_authenticate(user)
		response = self.client.put(url, data)
		self.assertEqual(response.status_code, 403)

		## employee
		data['main_image'] = File(open('media/test/test.jpg', 'rb'))
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.put(url, data)
		self.assertEqual(response.status_code, 200)

		car = Car.objects.get(pk=1)
		self.assertEqual(str(car), 'audi-a4-2017-24')

		## deleting image
		car.main_image.delete()

	def test_car_update_view_should_fail(self):
		"""
		tests CarUpdateView
		test shoudl fail
		"""
		url = reverse('car:car-update')
		data = {
			'id': 1,
			'brand': 'Audi',
			'model': 'A4',
		}

		data['main_image'] = File(open('media/test/test.jpg', 'rb'))
		user = User.objects.get(pk=2)
		self.client.force_authenticate(user)
		response = self.client.put(url, data)
		self.assertEqual(response.status_code, 400)


class TestCarModel(TestCase):

	@classmethod
	def setUpTestData(cls):
		"""
		sets 'fake' obj
		"""
		Car.objects.create(
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

	def test_slug_field(self):
		"""
		tests if slug is made correctly
		"""
		car = Car.objects.get(pk=1)
		self.assertEqual(str(car), 'volkswagen-passat-2006-19')