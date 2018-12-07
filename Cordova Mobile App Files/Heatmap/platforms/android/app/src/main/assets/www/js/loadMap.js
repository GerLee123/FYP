 function loadMap() {
     // initialize the map
     var map = L.map('map').setView([53.1424, -7.6921], 3);

     // load a tile layer
     L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
         {
             maxZoom: 18,
             minZoom: 3
         }).addTo(map);

     map.setZoom(6.25);
     $.getJSON("js/rodents.geojson", function (data) {
         var locations = data.features.map(function (rat) {
             // the heatmap plugin wants an array of each location
             var location = rat.geometry.coordinates.reverse();
             location.push(0.5);
             return location; // e.g. [50.5, 30.5, 0.2], // lat, lng, intensity
         });
         var heat = L.heatLayer(locations, {radius: 15});
         map.addLayer(heat);
     });
 }