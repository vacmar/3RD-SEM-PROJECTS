// Initialize the Leaflet map
let map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Array to store the coordinates of the source and destination
let points = [];
let markers = [];
let polyline = null;

// Map click event to select source and destination
map.on('click', function(e) {
    if (points.length < 2) {
        let latLng = [e.latlng.lat, e.latlng.lng];
        points.push(latLng);
        
        // Add a marker at the clicked location
        let marker = L.marker(latLng).addTo(map);
        markers.push(marker);
        
        if (points.length === 1) {
            alert("Source selected. Now click to select the destination.");
        } else if (points.length === 2) {
            alert("Destination selected. Drawing the shortest path...");
            drawPath();
        }
    } else {
        alert("Both source and destination are already selected. Reset the map to choose new points.");
    }
});

// Function to draw the path between the selected source and destination
// Function to draw the path between the selected source and destination
function drawPath() {
    if (points.length === 2) {
        // Use OpenRouteService to find the route between the two points
        L.Routing.control({
            waypoints: [
                L.latLng(points[0][0], points[0][1]),
                L.latLng(points[1][0], points[1][1])
            ],
            router: L.Routing.openrouteservice('your-api-key-here'),
            geocoder: L.Control.Geocoder.nominatim()
        }).addTo(map);
    }
}
// Function to reset the map
// Function to reset the map
function resetMap() {
    points = [];

    // Remove all markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Remove the polyline (route)
    if (polyline) {
        map.removeControl(polyline);
        polyline = null;
    }

    alert("Map has been reset. Please select a new source and destination.");
}
