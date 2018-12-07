// Function to get long and lat
function Get_Coordinates(){
	if ("geolocation" in navigator) {
		// check if geolocation is supported/enabled on current browser
		navigator.geolocation.getCurrentPosition(
				
			function success(position) {
				// for when getting location is a success
				console.log('latitude', position.coords.latitude, 'longitude', position.coords.longitude);
				var longg = position.coords.longitude
				var lat = position.coords.latitude
				var Carrier = "Sample Carrier" // get actual value from cordova app
				var MCC = "Sample Data" // get actual value from cordova app
				var MNC = "Sample Data" // get actual value from cordova app 
				var Signal_Type = "Sample Data" // get actual value from cordova app
				var Signal_Strength  = "Sample Data" // get actual value from cordova app
				var Upload_Time = "Sample Data" // get actual value from cordova app
				var Phone_Number = "Sample Data" // get actual value from cordova app
				var element = {'Carrier': Carrier, 'MCC':MCC, 'MNC':MNC, 'Signal_Type':Signal_Type, 'Signal_Strength':Signal_Strength, 'Upload_Time':Upload_Time, 'Phone_Number':Phone_Number, 'Latitude':lat, 'Longtitude':longg}
				
				var json_data = JSON.stringify(element);
				$.ajax({
					url: "../Update_HeatMap/",
					type: "POST",
					data: json_data,
					async: false,
					success: function(JSON) {
						alert("Success")
					}
				});
				
				
				$.ajax({
					url: "../HeatMap",
					type: "GET",
					dataType: "json",
					async: false,
					success: function(JSON) {
						for (var key in JSON) {
							if (JSON.hasOwnProperty(key)) {
								var val = JSON[key];
								console.log(val);
							}
						}
						for(element in JSON.Data){
							r_lat = JSON.Data[element].Latitude
							r_long = JSON.Data[element].Longtitude
							locations = [[r_lat,r_long]]
							Plot_Coordinates(longg,lat,locations)
						}
					}
				});
			},
					
			function error(error_message) {
				// for when getting location results in an error
				console.error('An error has occured while retrieving location', error_message)
			}  
		)
	} 
	else {
		 // geolocation is not supported
		 // get your location some other way
		 console.log('geolocation is not enabled on this browser')
	}
	
	
}

function Plot_Coordinates(longg,lat,locations){
	// initialize the map
	var map = L.map('map_marker').setView([lat, longg], 3);

	// Zoom in on map
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		maxZoom: 18,
		minZoom: 3
	}).addTo(map);
	map.setZoom(8.25);
	
	// add heat map
	for(element in locations){
		var heat = L.heatLayer([[locations[element][0], locations[element][1], 3]], { radius: 100 });
		map.addLayer(heat);
	}	
	
	
}
