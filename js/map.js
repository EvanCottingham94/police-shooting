// Function to draw your map
var countMen = 0;
var countWomen = 0;
var countUnarmed = 0;
var countArmed = 0;

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
	var raceLay = {};
	
	for(i = 0; i < data.length; i++) {
		if(data[i].Race == undefined){
				data[i].Race = "Unknown";
			}
		if(raceLay[data[i].Race] == undefined){
			raceLay[data[i].Race] = new L.LayerGroup([]);
			raceLay[data[i].Race].addTo(map);
		}
		if(data[i]["Victim's Gender"] == "Male"){
			var circle = L.circleMarker([data[i].lat, data[i].lng], { color: "blue", fillColor: "blue", radius: 5, opacity: 1}).addTo(raceLay[data[i].Race]);
			circle.bindPopup(data[i].Summary);
			countMen++;
		} else if(data[i]["Victim's Gender"] == "Female"){
			var circle = L.circleMarker([data[i].lat, data[i].lng], { color: "red", fillColor: "red", radius: 5, opacity: 1}).addTo(raceLay[data[i].Race]);
			circle.bindPopup(data[i].Summary);
			countWomen++;
		} 
		if(data[i]["Armed or Unarmed?"] == "Unarmed") {
			countUnarmed++;
		} else if(data[i]["Armed or Unarmed?"] == "Armed") {
			countArmed++;
		}
	}
	// Once layers are on the map, add a leaflet controller that shows/hides layers
	var control = L.control.layers(null, raceLay).addTo(map);
	table(countMen, countWomen, countUnarmed, countArmed);
	
}

var table = function(countMen, countWomen, countUnarmed, countArmed) { 
	if ($("#myTable tbody").length == 0) { 
		$("#myTable").append("<tbody></tbody>"); 
	}
	$("#myTable tbody").append( "<tr>" + "<td>" + countMen + "</td>" + "<td>" + countWomen + "</td>" + "<td>" + countUnarmed + "</td>" + "<td>" + countArmed + "</td>" + "</tr>" ); 
}
