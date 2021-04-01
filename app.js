const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
  console.log('Please provide a location!');
} else {
  geocode(address, (error, geocodeData) => {
    console.log('Loading...');
    if (error) {
      return console.log(error);
    }
    forecast(
      geocodeData.latitude,
      geocodeData.longitude,
      (error, forecastData) => {
        if (error) {
          return console.log(error);
        }

        console.log(geocode.location);
        console.log(forecastData);
      }
    );
  });
}
