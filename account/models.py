# We need to make Custom User Manager first
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
	"""
	Custom User Manager where user, and superuser is created
	based on email, not username.
	"""
	def create_user(self, email, password, **extra_fields):

		if not email:
			raise ValueError(_("Email is required"))

		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		user.set_password(password)
		user.save()

		return user

	def create_superuser(self, email, password, **extra_fields):

		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)
		extra_fields.setdefault('is_active', True)

		return self.create_user(email, password, **extra_fields)


# Then we are making Custo User Model
from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime


class User(AbstractUser):
	"""
	Custom User Model
	"""
	email 				= models.EmailField(unique=True)
	is_client 			= models.BooleanField(default=False)
	is_employee 		= models.BooleanField(default=False)
	username			= None

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	objects = CustomUserManager()	

	def __str__(self):
		return f"Name: {self.first_name} {self.last_name} e-mail: {self.email}"


class Client(models.Model):
	"""
	Table with extra fields for Client
	Releted to the User
	"""
	user 				= models.OneToOneField(User, on_delete=models.CASCADE)
	driver_license		= models.CharField(max_length=20, unique=True)
	city 				= models.CharField(max_length=30)
	street 				= models.CharField(max_length=30)
	street_number 		= models.CharField(max_length=10)
	postal_code 		= models.CharField(max_length=10)
	phone_number 		= models.CharField(max_length=20)
	birth_day 			= models.DateField(default=datetime.date.today)