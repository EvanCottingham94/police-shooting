// Function to draw your map
var drawMap = function() {
	var map = L.map('container').setView([39.10, -95.80], 4);
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
    layer.addTo(map);
    getData(map);
}
// Function for getting data
var getData = function(map) {	
	var data;
	 $.ajax({
		 url:"data/response.json",
		 type: "get",
		 success:function(data) {
		   data = data
		   customBuild(data, map);
		 }, 
		 dataType:"json"
	})
  // When your request is successful, call your customBuild function
}
// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	// Be sure to add each layer to the map
	var arrayLayers = new Array();
	var race = new L.LayerGroup([]);
	for(i = 0; i < data.length; i++) {
		arrayLayers.push(data[i].race);
		if($.inArray(data[i].race, arrayLayers) == -1) {	
			race.addLayer(data[i].race);
			race.addTo(map);
	    }
		if(data[i]["Victim's Gender"] == "Male"){
			var circle = L.circleMarker([data[i].lat, data[i].lng], { color: "blue", fillColor: "blue", radius: 5, opacity: 1}).addTo(map);
			circle.bindPopup(data[i].Summary);
		} else {
			var circle = L.circleMarker([data[i].lat, data[i].lng], { color: "red", fillColor: "red", radius: 5, opacity: 1}).addTo(map);
			circle.bindPopup(data[i].Summary);
		}
	}
	
	// Once layers are on the map, add a leaflet controller that shows/hides layers
	var baseMaps = {
		"Unknown" : race.Unknown
	}
	
	var control = L.control.layers(baseMaps).addTo(map);
}


