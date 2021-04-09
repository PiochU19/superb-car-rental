from django.db import models


class Issue(models.Model):
	title 			= models.CharField(max_length=50)
	email 			= models.EmailField()
	message 		= models.TextField()
	responded 		= models.BooleanField(default=False)