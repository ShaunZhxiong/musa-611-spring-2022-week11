const map = L.map('map').setView([39.95, -75.16], 16);

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}).addTo(map);

/*
  We're going to add a marker for the user's position on the map. However, we
  won't know the actual position when we're not tracking it. To communicate to
  the user whether the marker represents their actual position, we will style
  the marker differently based on whether we are tracking their position or not.
*/
const trackingStyle = { color: 'blue' };
const nonTrackingStyle = { color: 'red' };

const positionMarker = L.circleMarker(
  [39.95, -75.16],
  nonTrackingStyle,
).addTo(map);
let trackingID = null;

/*
  When the user clicks the tracking button for the first time, we'll start
  following their position. When the user clicks the tracking button again, we
  will STOP following their position.
*/
const trackingButton = document.querySelector('#tracking-button');
trackingButton.addEventListener('click', () => {
  if (trackingID === null) {
    startTracking();
  } else {
    stopTracking();
  }
});


const startTracking = function() {
  // Start tracking the position.
  console.log('Starting to track position...')
  trackingID = navigator.geolocation.watchPosition(handlePositionUpdated);

  // Update the button text.
  trackingButton.innerHTML = 'Stop Tracking Me.'
};


const stopTracking = function() {
  // Stop tracking the position.
  navigator.geolocation.clearWatch(trackingID);
  trackingID = null;
  console.log('No longer tracking position...')

  // Update the marker style.
  positionMarker.setStyle(nonTrackingStyle);

  // Update the button text.
  trackingButton.innerHTML = 'Track Me!'
};


const handlePositionUpdated = function(position) {
  // Move the position marker to the
  const latlng = [position.coords.latitude, position.coords.longitude]
  positionMarker.setLatLng(latlng);
  map.panTo(latlng);

  // Now that we know the user's position, update the marker style.
  positionMarker.setStyle(trackingStyle);

  console.log(position);
};
