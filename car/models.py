from django.db import models

## Import to slugify SlugField
from django.utils.text import slugify 


class Car(models.Model):
	"""
	Car for renting
	"""
	slug 				= models.SlugField(blank=True, unique=True)
	brand 				= models.CharField(max_length=30)
	model 				= models.CharField(max_length=30)
	generation 			= models.CharField(max_length=10, blank=True)
	engine 				= models.DecimalField(max_digits=2, decimal_places=1)
	year_of_production 	= models.IntegerField()
	body_type 			= models.CharField(max_length=20)
	fuel_type 			= models.CharField(max_length=20)
	hourse_power 		= models.IntegerField()
	main_image			= models.ImageField(upload_to='car_images/')
	price_per_day		= models.IntegerField()

	def __str__(self):
		return f"{self.slug}"

	def save(self, *args, **kwargs):
		"""
		Presave method
		"""
		dictionary = {
			261: 97, # ą
			263: 99, # ć
			281: 101, # ę
			322: 108, # ł
			347: 115, # ś
			243: 111, # ó
			322: 108, # ł
			324: 110, # ń
			380: 122, # ż
			378: 122, # ź
		}

		string = (self.brand +"-"+ self.model +"-"+ str(self.year_of_production) +"-"+ str(self.engine)).lower()
		string = string.translate(dictionary)
		self.slug = slugify(string)
		super(Car, self).save(*args, **kwargs)



class CarImage(models.Model):
	"""
	Car images (table related
	to car table)
	"""
	car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='car_images')
	image = models.ImageField(upload_to='car_images/')

	class Meta:
		ordering = ('car',)

	def __str__(self):
		return f"{self.car} {self.image}"