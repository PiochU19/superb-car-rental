from django.db import models
from account.models import User
from car.models import Car


class Rent(models.Model):
	"""
	User can rents cars
	One car can't be rentend
	at the same time
	"""
	slug 					= models.SlugField(unique=True, blank=True)
	user 					= models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_rent')
	car 					= models.ForeignKey(Car, on_delete=models.CASCADE, related_name='car_rent')
	rent_starts				= models.DateField()
	rent_ends 				= models.DateField()
	additional_insurance 	= models.BooleanField(default=False)
	price 					= models.IntegerField(blank=True)

	def __str__(self):
		return f"{self.slug}"

	def save(self, *args, **kwargs):
		self.price = (self.rent_ends - self.rent_starts).days * self.car.price_per_day

		if self.additional_insurance:
			self.price *= 1.10

		super(Rent, self).save(*args, **kwargs)

		self.slug = f"{self.car}-{self.id}"

		super(Rent, self).save(*args, **kwargs)