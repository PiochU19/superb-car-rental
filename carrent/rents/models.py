from django.db import models
from carrent.account.models import User
from carrent.car.models import Car


class Rent(models.Model):
	"""
	User can rents cars
	One car can't be rentend
	at the same time
	"""
	slug 					= models.SlugField(unique=True, blank=True)
	user 					= models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_rent')
	car 					= models.ForeignKey(Car, on_delete=models.CASCADE, related_name='related_car')
	rent_starts				= models.DateField()
	rent_ends 				= models.DateField()
	additional_insurance 	= models.BooleanField(default=False)
	price 					= models.IntegerField()

	class Meta:
		ordering = ('-rent_starts',)

	def __str__(self):
		return f"{self.slug}"

	def save(self, *args, **kwargs):
		if not self.id:
			super(Rent, self).save()

		self.slug = f"{self.car}-{self.id}"

		super(Rent, self).save()