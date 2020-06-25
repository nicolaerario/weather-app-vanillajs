// Html elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".weather-temperature p");
const descElement = document.querySelector(".weather-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// API key
const api_key = "46506643b729f854cbe673fd3c739fe0";

// The object that stores tha response data
const weatherData = {};

// Check for browser geolocation support
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>No geolocation support</p>";
}

// Set browser's position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// Show the error message if there are issues with getCurrentPosition
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Get weather data from API
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weatherData.temperature = data.main.temp;
      weatherData.description = data.weather[0].description;
      weatherData.iconId = data.weather[0].icon;
      weatherData.city = data.name;
      weatherData.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

// Disply the weather in the html
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weatherData.iconId}.png"/>`;
  tempElement.innerHTML = `${weatherData.temperature}°<span>C</span>`;
  descElement.innerHTML = weatherData.description;
  locationElement.innerHTML = `${weatherData.city}, ${weatherData.country}`;
}
