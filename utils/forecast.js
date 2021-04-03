const request = require('postman-request');

const weatherKey = 'bd857a590539a0b66ea32270a1a88332';

const forecast = (latitude, longitude, callback) => {
  const lat = latitude.toFixed(3);
  const long = longitude.toFixed(3);

  const url = `http://api.weatherstack.com/forecast?access_key=${weatherKey}&query=${lat},${long}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to Connect to a Weather Service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find the given location!', undefined);
    } else {
      const weatherDescription = response.body.current.weather_descriptions[0];
      const temperature = response.body.current.temperature;
      const feelsLike = response.body.current.feelslike;

      callback(
        undefined,
        `${weatherDescription}. It is currently ${temperature} degrees out. The RealFeel is ${feelsLike} degrees.`
      );
    }
  });
};

module.exports = forecast;
