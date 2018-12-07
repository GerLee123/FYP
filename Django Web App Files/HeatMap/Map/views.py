# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from . models import HeatMap_Instance
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
import json


@login_required(login_url='login')
def index(request):
	User_ID = request.user # get id of current user
	print (User_ID)
	template = 'Map/index.html'
	context = {}
	return render (request,template, context)
	

def HeatMap(request):
	database_results = []
	print ("WOKRING AND CALLED")
	User_IDD = request.user # get id of current user
	Map_Data = HeatMap_Instance.objects.all()
	for element in Map_Data:
		item = model_to_dict(element)
		database_results.append(item)
	return JsonResponse({'Data': database_results})

@csrf_exempt
def Update_HeatMap(request):
	User_IDD = request.user # get id of current user
	json_data = json.loads(request.body) # load json data
	
	# Get veriables from json data
	d_Carrier = json_data['Carrier']
	d_MCC = json_data['MCC']
	d_MNC = json_data['MNC']
	d_Signal_Type = json_data['Signal_Type']
	d_Signal_Strength = json_data['Signal_Strength']
	d_Upload_Time = json_data['Upload_Time']
	d_Phone_Number = json_data['Phone_Number']
	d_Latitude = json_data['Latitude']
	d_Longtitude = json_data['Longtitude']
	
	# Check if user exists in Model and update or create if not
	obj,created = HeatMap_Instance.objects.update_or_create(User_ID=User_IDD, Carrier=d_Carrier, MCC=d_MCC, MNC=d_MNC, Signal_Type=d_Signal_Type, Signal_Strength=d_Signal_Strength, Latitude=d_Latitude, Longtitude=d_Longtitude, Upload_Time=d_Upload_Time, Phone_Number=d_Phone_Number)
	obj.save()
	return HttpResponse(status=200)
