const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=82d26b6116195e830c95d4c0e208de88&query=" +
    longitude +
    "," +
    latitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        "It is currently " +
          body.current.weather_descriptions[0] +
          " with " +
          body.current.temperature +
          " ºC on the outside. It feels like " +
          body.current.feelslike +
          " ºC. " +
          "Relative humidity currently is " +
          body.current.humidity +
          "% and cloud cover is " +
          body.current.cloudcover +
          "%."
      );
    }
  });
};

module.exports = forecast;
