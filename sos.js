// Fetch user location for display
function updateLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude.toFixed(4);
      const lon = pos.coords.longitude.toFixed(4);
      document.getElementById("coords").textContent =
        `Latitude: ${lat}° | Longitude: ${lon}°`;
    }, () => {
      document.getElementById("coords").textContent = "Location not available.";
    });
  } else {
    document.getElementById("coords").textContent = "Geolocation not supported.";
  }
}

// Simulated SOS action
document.getElementById("sosBtn").addEventListener("click", () => {
  alert("Emergency SOS sent! Your location is being shared with authorities.");
});

// Simulate call button
function callNumber(number) {
  window.location.href = `tel:${number}`;
}

updateLocation();
