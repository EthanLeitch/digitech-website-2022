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

// Adding layer to the map
map.addLayer(layer);

/* Adding a marker to the map
var marker = L.marker([-45.85518, 170.49800]).addTo(map);
marker.bindPopup("<b>John McGlashan College</b><br>I am a popup."); */

var gpsMarker = null;

function searchFunction() {
	// Declare variables
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('myInput');
	filter = input.value.toUpperCase();
	ul = document.getElementById("myUL");
	li = ul.getElementsByTagName('li');

	if(input.value.length < 3) {
    	for (i = 0; i < li.length; i++) {
        	li[i].style.display = "";
		}
        return;
	}

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

function toggleList() {
	for (i = 0; i < li.length; i++) {
		li[i].style.display = "none";
	}
}

$.getJSON("/getpythondata", function(data) {
    // alert(JSON.stringify(data.classrooms));
	var classroomData = data.classroom;
	
	for (var key in classroomData) {
		if (classroomData.hasOwnProperty(key)) {
			// Debugging commands
			// console.log(key + " -> " + JSON.stringify(classroomData[key]));
			// console.log(classroomData[key].latitude, classroomData[key].longitude, classroomData[key].room_number)

			// Add locations as map markers 
			temp = new L.marker([classroomData[key].latitude, classroomData[key].longitude])
			.bindPopup("<b>" + classroomData[key].room_name + "</b><br>" + classroomData[key].room_description)
			.addTo(map);

			// Add locations to search bar list  
			$(".dropdown").append("<li><a href=\"\">" + classroomData[key].room_name + "</a></li>");

		}
	}
})

/*map.locate({setView: true, watch: true}) // This will return map so you can do chaining 
.on('locationfound', function(e){
    if(gpsMarker == null) {
        gpsMarker = L.marker(e.latlng).bindPopup("<b>You are here</b>");
        map.addLayer(gpsMarker);
    } else {
        gpsMarker.setLatLng(e.latlng);
    }

	//var marker = L.marker([e.latitude, e.longitude]).bindPopup('You are here');
	/*var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
		weight: 1,
		color: 'blue',
		fillColor: '#cacaca',
		fillOpacity: 0.2
	});*/
	//map.addLayer(marker);
	/*map.addLayer(circle);
})
.on('locationerror', function(e){
	console.log(e);
});*/