// map.js

// Creating map options
var mapOptions = {
	center: [-45.85518, 170.49800], 
	zoom: 18
}

// Creating tilelayer options
var layerOptions = {
	minZoom: 17,
	maxZoom: 19,
	maxNativeZoom: 18
}

// Create map bounds to reduce load on tile servers
var southWest = L.latLng(-45.8600, 170.4923),
	northEast = L.latLng(-45.8491, 170.5058),
	bounds = L.latLngBounds(southWest, northEast);

// Creating the map object
var map = new L.map('map', mapOptions);

// Set map max bounds  
map.setMaxBounds(bounds);

// Creating a Layer object
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', layerOptions);
// COPYRIGHT: https://www.openstreetmap.org/copyright

// Add the layer to the map
map.addLayer(layer);

var gpsMarker = null;

var goldIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

// Set up array for marker storage
var markers = [];

// Add locations to map markers and search bar
$.getJSON("/getpythondata", function(data) {
	var classroomData = data.classroom;
	
	for (var key in classroomData) {
		if (classroomData.hasOwnProperty(key)) {
			/* Debugging commands
			console.log(key + " -> " + JSON.stringify(classroomData[key]));
			console.log(classroomData[key].latitude, classroomData[key].longitude, classroomData[key].room_number)
			*/

			// Set room_description to empty string so null is not displayed.
			if (classroomData[key].room_description == null) {
				classroomData[key].room_description = "";
			}

			// Add location as map marker
			temp = new L.marker([classroomData[key].latitude, classroomData[key].longitude])
			.bindPopup("<b>" + classroomData[key].room_name + "</b><br>" + classroomData[key].room_description)
			.addTo(map);
			// Add location to markers array 
			markers.push([classroomData[key].room_name, temp]);

			// Add location to search bar list
			// NOTE: This could use tweaking. Embedding JS in onclick events like this is generally not reccomended.
			$("#myUL").append("<a href=\"#myInput\" onclick=\"jumpToMarker(\'" + classroomData[key].room_name + "\');\">" + classroomData[key].room_name + "</a>");

		}
	}
})

// Function that pans to marker and shows its corresponding popup
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
	a = ul.getElementsByTagName("a");

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}

// Set current user location
map.locate({setView: false, watch: true}) // This will return map so you can do chaining 
.on('locationfound', function(e){
	// Checks if marker has been created. This is to prevent the indication marker from duplicating
	// If the marker hasn't been created, create it.
    if(gpsMarker == null) {
        gpsMarker = L.marker(e.latlng, {icon: goldIcon}).bindPopup("<b>You are here</b>");
        map.addLayer(gpsMarker);
	// If the marker has been created, update it.
    } else {
        gpsMarker.setLatLng(e.latlng);
    }
})
.on('locationerror', function(e){
	console.log(e);
});

// Debugging command: prints Latitude and Longitude of mouse click to console. 
map.on('click', function(e) {
    console.log("Lat, Lon: " + e.latlng.lat + ", " + e.latlng.lng)
});
