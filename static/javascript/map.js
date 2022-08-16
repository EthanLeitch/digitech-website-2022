// map.js

// Creating map options
var mapOptions = {
center: [-45.85518, 170.49800], 
zoom: 18
}

// Creating a map object
var map = new L.map('map', mapOptions);

// Creating a Layer object
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
// COPYRIGHT: https://www.openstreetmap.org/copyright

// Add the layer to the map
map.addLayer(layer);

var gpsMarker = null;

// Set up array for marker storage
var markers = [];

// Set dropdown to hidden by default
$(document).ready(function(){
	$(".dropdown").hide(); 
	
	// Toggle dropdown visibility on focus 
	$("#myInput").focus(function(){
		if (!$("#myInput").val()) {
			$(".dropdown").show();
		}
	});
	/*$("#myInput").focusout(function(){
		if (!$("#myInput").val()) {
			$(".dropdown").hide();
		}
	});*/
});

// Add locations to map markers and search bar
$.getJSON("/getpythondata", function(data) {
	var classroomData = data.classroom;
	
	for (var key in classroomData) {
		if (classroomData.hasOwnProperty(key)) {
			/* Debugging commands
			console.log(key + " -> " + JSON.stringify(classroomData[key]));
			console.log(classroomData[key].latitude, classroomData[key].longitude, classroomData[key].room_number)
			*/

			// Add locations as map markers 
			// Set room_description to empty string so null is not displayed.
			if (classroomData[key].room_description == null) {
				classroomData[key].room_description = "";
			}

			temp = new L.marker([classroomData[key].latitude, classroomData[key].longitude])
			.bindPopup("<b>" + classroomData[key].room_name + "</b><br>" + classroomData[key].room_description)
			.addTo(map);
			markers.push([classroomData[key].room_name, temp]);

			// Add locations to search bar list
			// TODO: This could use tweaking. Embedding JS in onclick events like this is generally not reccomended.
			$(".dropdown").append("<li><a onclick=\"jumpToMarker(\'" + classroomData[key].room_name + "\');\">" + classroomData[key].room_name + "</a></li>");

		}
	}
})

function jumpToMarker(name) {
	$.getJSON("/getpythondata", function(data) {
		var classroomData = data.classroom;

		for (var key in classroomData) {
			// For every item in classroomData, check if the stored name matches the name passed to the function
			if(classroomData[key].room_name == name) {
				map.flyTo([classroomData[key].latitude, classroomData[key].longitude], 18);
				
				// Open the popup by checking if the marker name is equal to the stored name
				for (var i in markers) {					
					if (markers[i][0] == classroomData[key].room_name){
						markers[i][1].openPopup();
					};
				}
				
			}
		}

	})
}

// Menubar search function
function searchFunction() {
	// Declare variables
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	ul = document.getElementById("myUL");
	li = ul.getElementsByTagName("li");

	/* // Only show list items once a character has been typed in
	if(input.value.length < 2) {
    	for (i = 0; i < li.length; i++) {
        	li[i].style.display = "";
		}
        return;
	} */ 

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByTagName("a")[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

// Set current user location
map.locate({setView: false, watch: true}) // This will return map so you can do chaining 
.on('locationfound', function(e){
    if(gpsMarker == null) {
        gpsMarker = L.marker(e.latlng).bindPopup("<b>You are here</b>");
        map.addLayer(gpsMarker);
    } else {
        gpsMarker.setLatLng(e.latlng);
    }
})
.on('locationerror', function(e){
	console.log(e);
});

// Debugging Command: prints Latitude and Longitude of mouse click. 
map.on('click', function(e) {
    console.log("Lat, Lon: " + e.latlng.lat + ", " + e.latlng.lng)
});
