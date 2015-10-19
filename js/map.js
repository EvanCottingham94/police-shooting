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
		 success:function(data, map) {
		   //data = data
		   customBuild(data, map);
		 }, 
		 dataType:"json"
	})
  // When your request is successful, call your customBuild function
}
// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	// Be sure to add each layer to the map
	var arrayLayers;
	var race;
	for(i = 0; i < data.length; i++) {
		if($.inArray(data[i].race, arrayLayers) != -1) {
			arrayLayers.push(data[i].race);
			race = new L.LayerGroup([data[i].race]);
			race.addTo(map);
	    }
		var circle = new L.circleMarker(data[i].lat, data[i].lng);
		circle.addTo(race);
	}
	// Once layers are on the map, add a leaflet controller that shows/hides layers
}


