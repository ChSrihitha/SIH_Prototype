const form = document.getElementById('touristForm');
const idCard = document.getElementById('idCard');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const fullName = document.getElementById('fullName').value;
  const passportId = document.getElementById('passportId').value;
  const nationality = document.getElementById('nationality').value;
  const emergencyContact = document.getElementById('emergencyContact').value + " (" + document.getElementById('emergencyPhone').value + ")";
  const itinerary = document.getElementById('itinerary').value || "Not provided";

  // Display on ID Card
  document.getElementById('displayName').textContent = fullName;
  document.getElementById('displayID').textContent = passportId;
  document.getElementById('displayNationality').textContent = nationality;
  document.getElementById('displayEmergency').textContent = emergencyContact;
  document.getElementById('displayItinerary').textContent = itinerary;

  // Show the ID card
  idCard.classList.remove('hidden');

  // Optional: Scroll to the ID card
  idCard.scrollIntoView({behavior: "smooth"});
});
