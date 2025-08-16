// travel options dummy
const dummyResults = [
  { type: "Car", time: "10:00 AM", duration: "2h 30m", price: "$25" },
  { type: "Train", time: "11:15 AM", duration: "2h 0m", price: "$18" },
  { type: "Bus", time: "12:00 PM", duration: "3h 15m", price: "$12" }
];

//load pevious trips
let tripsHistory = JSON.parse(localStorage.getItem('tripsHistory')) || [];

//home page
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

if (searchBtn && searchResults) {
  searchBtn.addEventListener('click', () => {
    const start = document.getElementById('start').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const travelType = document.querySelector('input[name="travelType"]:checked').value;

    if (!start || !destination) {
      alert("Please enter both start and destination locations.");
      return;
    }

    if (start === destination) {
      alert("Start and destination locations cannot be the same.");
      return;
    }

    //selected travel type
    const results = dummyResults.filter(r => r.type === travelType);

    //show selected
    searchResults.innerHTML = '';
    results.forEach(r => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${r.type}</strong> - ${r.time} - ${r.duration}
        </div>
        <div>${r.price}</div>
        <button class="selectBtn">Select</button>
      `;
      const selectBtn = li.querySelector('.selectBtn');
      selectBtn.addEventListener('click', () => {
        const trip = {
          date: new Date().toLocaleDateString(),
          start,
          destination,
          type: r.type,
          price: r.price
        };

        //Add trip to history
        tripsHistory.push(trip);

        //Keep only the 10 most recent trips
        if (tripsHistory.length > 10) {
          tripsHistory.shift(); // remove oldest trip
        }

        // Save updated trips to localStorage
        localStorage.setItem('tripsHistory', JSON.stringify(tripsHistory));

        alert("Trip booked succesfully!");
      });
      searchResults.appendChild(li);
    });
  });
}

//previous trips page
function renderPreviousTrips() {
  const previousTrips = document.getElementById('previousTrips');
  if (!previousTrips) return; // Exit if not on this page

  previousTrips.innerHTML = '';

  if (tripsHistory.length === 0) {
    previousTrips.innerHTML = "<p>Book Trips to see them here.</p>";
    return;
  }

  //most recent trips to oldest (sorting)
  tripsHistory.slice().reverse().forEach(trip => {
    const div = document.createElement('div');
    div.classList.add('trip-item');
    div.innerHTML = `
      <p><strong>Date:</strong> ${trip.date}</p>
      <p><strong>From:</strong> ${trip.start} | <strong>To:</strong> ${trip.destination}</p>
      <p><strong>Type:</strong> ${trip.type} | <strong>Fare:</strong> ${trip.price}</p>
    `;
    previousTrips.appendChild(div);
  });
}

// Render previous trips on page load if on previous.html
document.addEventListener('DOMContentLoaded', () => {
  renderPreviousTrips();
});

//profile page (not implemented)
function renderProfile() {
  const profileTripsCount = document.getElementById('profileTripsCount');
  if (!profileTripsCount) return;

  profileTripsCount.textContent = `You have taken ${tripsHistory.length} trips.`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
});
