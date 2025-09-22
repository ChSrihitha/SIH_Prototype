// ======= Multi-Zone Geo-Fencing with Leaflet =======

// Map center (adjust to your region)
const centerLat = 26.1904;
const centerLng = 92.9158;
const zoomLevel = 8;

const map = L.map('map').setView([centerLat, centerLng], zoomLevel);

// Free OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// ---- Geofence Zones ----
// Distances are in meters
const greenZone = L.circle([centerLat, centerLng], {
  radius: 3000,
  color: 'green',
  fillColor: 'green',
  fillOpacity: 0.25
}).addTo(map).bindPopup('🟢 Safe Zone');

const yellowZone = L.circle([centerLat, centerLng], {
  radius: 7000,
  color: 'gold',
  fillColor: 'gold',
  fillOpacity: 0.25
}).addTo(map).bindPopup('🟡 Caution Zone');

const redZone = L.circle([centerLat, centerLng], {
  radius: 12000,
  color: 'red',
  fillColor: 'red',
  fillOpacity: 0.25
}).addTo(map).bindPopup('🔴 Danger Zone');

// ---- User Location ----
function updateUserLocation(e) {
  const userLatLng = e.latlng;

  // Update location text
  document.getElementById('current-location').textContent =
    `Lat: ${userLatLng.lat.toFixed(4)}, Lng: ${userLatLng.lng.toFixed(4)}`;

  // Marker
  if (!map.userMarker) {
    map.userMarker = L.marker(userLatLng).addTo(map);
  } else {
    map.userMarker.setLatLng(userLatLng);
  }

  // Determine which zone the user is in
  let zoneMessage = 'Outside All Zones';
  if (greenZone.getBounds().contains(userLatLng)) {
    zoneMessage = '🟢 Inside Green – Safe';
  } else if (yellowZone.getBounds().contains(userLatLng)) {
    zoneMessage = '🟡 Inside Yellow – Caution';
  } else if (redZone.getBounds().contains(userLatLng)) {
    zoneMessage = '🔴 Inside Red – Danger';
  }
  map.userMarker.bindPopup(zoneMessage).openPopup();
}

function handleError(e) {
  alert('Location error: ' + e.message);
}

// Watch location continuously
map.locate({ watch: true, enableHighAccuracy: true });
map.on('locationfound', updateUserLocation);
map.on('locationerror', handleError);

// Manual update button
document.getElementById('update-location').addEventListener('click', () => {
  map.locate({ setView: true, maxZoom: 14 });
});
