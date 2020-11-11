# Local Weather Forecast

## Description

Displays the local weather forecast using React and Redux. Uses the Geolocation API to retrieve the user's location, and if it's not enabled, prompts for the user's zip code to display the weather information. Data for the application is stored in Redux. Used Bootstrap to make the application more visually appealing.

## Features

The application attempts to get the user's longitude and latitude using the Geolocation API in the web browser. If that isn't successful, then a form is displayed to collect the user's zip code to display the weather forecast.

## APIs Used

Created using the [Open Weather API](https://openweathermap.org/api/), specifically the [One Call API](https://openweathermap.org/api/one-call-api) which requires a longitude and latitude to retrieve weather information.

Used the [Zip Code API](http://www.zipcodeapi.com/API), to retrieve the longitude and latitude when the Geolocation API doesn't retreive that information from the web browser.

## Deployment 

The application is deployed to [GitHub Pages](https://mirfishe.github.io/weather-forecast/).
