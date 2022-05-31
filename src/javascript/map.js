// map.js

// Creating map options
var mapOptions = {
    center: [-45.85518, 170.49800],
    zoom: 18
    }
    
    // Creating a map object
    var map = new L.map('map', mapOptions);
    
    /* Creating a Layer object
    COPYRIGHT: https://www.openstreetmap.org/copyright
    New Zealand: Contains data sourced from the LINZ Data Service and licensed for reuse under CC BY 4.0 */
    var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    
    // Adding layer to the map
    map.addLayer(layer);
    
    // Adding marker to the map
    var marker = L.marker([-45.85518, 170.49800]).addTo(map);
    marker.bindPopup("<b>John McGlashan College</b><br>I am a popup.");
    
    map.locate({setView: true, watch: true}) // This will return map so you can do chaining 
    .on('locationfound', function(e){
        var marker = L.marker([e.latitude, e.longitude]).bindPopup('You are here');
        var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
            weight: 1,
            color: 'blue',
            fillColor: '#cacaca',
            fillOpacity: 0.2
        });
        map.addLayer(marker);
        map.addLayer(circle);
    })
    .on('locationerror', function(e){
        console.log(e);
        //alert("ERROR: Location access denied. Please allow location access to display current position.");
    });