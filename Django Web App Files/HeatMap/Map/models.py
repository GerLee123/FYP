# -*- coding: utf-8 -*-

from __future__ import unicode_literals
from django.db import models

# Model to story vulnerability information
class HeatMap_Instance(models.Model):
	Entry_ID = models.AutoField(primary_key=True)
	User_ID = models.ForeignKey('auth.User', on_delete=models.CASCADE)
	Carrier = models.CharField(max_length=200)
	MCC = models.CharField(max_length=200)
	MNC = models.CharField(max_length=200)
	Signal_Type = models.CharField(max_length=200)
	Signal_Strength = models.CharField(max_length=200)
	Latitude = models.CharField(max_length=200)
	Longtitude = models.CharField(max_length=200)
	Upload_Time = models.CharField(max_length=200)
	Phone_Number = models.CharField(max_length=200)
	
	



	def __str__(self):
		return u'%s %s %s %s %s %s %s %s %s %s %s' % (self.Entry_ID, self.User_ID, self.Carrier, self.MCC, self.MNC, self.Signal_Type, self.Signal_Strength, self.Latitude, self.Longtitude, self.Upload_Time, self.Phone_Number)
