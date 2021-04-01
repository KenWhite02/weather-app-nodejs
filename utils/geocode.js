const request = require('postman-request');

const geocodeToken =
  'pk.eyJ1Ijoia2Vud2hpdGUiLCJhIjoiY2tteGg5MGR5MG5nYjJ3cGZoZm5hMDNqNSJ9.Cf9wm_O0QZJ0dmEvUNtbcw';
const geocodeLimit = 1;

const geocode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${geocodeToken}&limit=${geocodeLimit}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to Connect to Location Services!');
    } else if (response.body.features.length === 0) {
      callback('Unable to find Location. Try another search.');
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;