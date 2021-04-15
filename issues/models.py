from django.db import models


class Issue(models.Model):
	title 			= models.CharField(max_length=50)
	email 			= models.EmailField()
	message 		= models.TextField(max_length=1000)
	responded 		= models.BooleanField(default=False)

	class Meta:
		ordering = ('responded',)