const APIKEY =
  "https://api.open-meteo.com/v1/forecast?latitude=43.65&longitude=-79.34&hourly=is_day&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto";

const currTemp = document.querySelector(".temp-main");
const currWeather = document.querySelector(".weather-main");
const container = document.querySelector(".temp-container");
const input = document.getElementById("input");
const searchForm = document.querySelector("form");
const forecastDisplay = document.querySelector(".forecast-container");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const today = new Date();

async function getWeatherData(lat, lon) {
  const respData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=is_day&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`
  );
  const response = await respData.json();

  displayWeather(response);
}

function displayWeather(response) {
  const weatherType = getWeatherType(response.current_weather.weathercode);
  const isDay = response.current_weather.is_day;

  currTemp.innerHTML = response.current_weather.temperature + "°";
  currWeather.innerHTML = weatherType[0];

  forecastDisplay.innerHTML =
    '<div class="text-container"><span class="text">Min</span><span class="text">Max</span></div>';

  for (let i = 0; i < weekdays.length; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.innerHTML = `<span class="weekday_1 weekday">${
      weekdays[(today.getDay() + i + 1) % weekdays.length]
    }</span></span><span class="temp temp_1_min">${
      response.daily.temperature_2m_min[i] + "°"
    }</span><span class="temp temp_1_max">${
      response.daily.temperature_2m_max[i] + "°"
    }</span><span class="weather_img img_1">${weatherType[1]}</span>`;
    forecastDisplay.append(day);
  }

  if (isDay === 0) {
    container.style = "background-image: url(images/night.jpg);";
  } else if (isDay === 1) {
    container.style = "background-image: url(images/day.jpg);";
  }

  // const buttons = document.querySelectorAll('.weekday')

  // buttons.forEach((button) => {
  //   button.addEventListener('click', () => {
  //     console.log(weekdays.indexOf(button.innerHTML))
  //   })
  // })
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  forecastDisplay.innerHTML = "";
  getCoords();
});

async function getCoords() {
  const search = `https://nominatim.openstreetmap.org/search/${input.value}?format=json`;
  const respData = await fetch(search);
  const response = await respData.json();

  if (response.length != 0) {
    getWeatherData(response[0].lat, response[0].lon);
  } else {
    input.value = "Invalid City";
    currTemp.innerHTML = "";
    currWeather.innerHTML = "";
    container.style = "background-image: none";
  }
}

function getWeatherType(code) {
  let weather = "";
  let icon = "";

  switch (code) {
    case 0:
      weather = "Clear sky";
      icon = '<img src="./images/clear.png" />';
      break;
    case 1:
      weather = "Mainly clear";
      icon = '<img src="./images/clear.png" />';
      break;
    case 2:
      weather = "Partly cloudy";
      icon = '<img src="./images/cloud.png" />';
      break;
    case 3:
      weather = "Overcast";
      icon = '<img src="./images/cloud.png" />';
      break;
    case 45:
      weather = "Fog";
      icon = '<img src="./images/mist.png" />';
      break;
    case 48:
      weather = "Depositing rime fog";
      icon = '<img src="./images/mist.png" />';
      break;
    case 51:
      weather = "Light Drizzle";
      icon = '<img src="./images/rain.png" />';
      break;
    case 53:
      weather = "Moderate Drizzle";
      icon = '<img src="./images/rain.png" />';
      break;
    case 55:
      weather = "Dense Drizzle";
      icon = '<img src="./images/rain.png" />';
      break;
    case 56:
      weather = "Freezing Light Drizzle";
      icon = '<img src="./images/rain.png" />';
      break;
    case 57:
      weather = "Freezing Dense Drizzle";
      icon = '<img src="./images/rain.png" />';
      break;
    case 61:
      weather = "Slight Rain";
      icon = '<img src="./images/rain.png" />';
      break;
    case 63:
      weather = "Moderate Rain";
      icon = '<img src="./images/rain.png" />';
      break;
    case 65:
      weather = "Heavy Rain";
      icon = '<img src="./images/rain.png" />';
      break;
    case 66:
      weather = "Freezing Light Rain";
      icon = '<img src="./images/rain.png" />';
      break;
    case 67:
      weather = "Freezing Heavy Rain";
      icon = '<img src="./images/rain.png" />';
      break;
    case 71:
      weather = "Slight Snowfall";
      icon = '<img src="./images/snow.png" />';
      break;
    case 73:
      weather = "Moderate Snowfall";
      icon = '<img src="./images/snow.png" />';
      break;
    case 75:
      weather = "Heavy Snowfall";
      icon = '<img src="./images/rain.png" />';
      break;
    case 77:
      weather = "Snow Grains";
      icon = '<img src="./images/rain.png" />';
      break;
    case 80:
      weather = "Slight Rain Shower";
      icon = '<img src="./images/rain.png" />';
      break;
    case 81:
      weather = "Moderate Rain Shower";
      icon = '<img src="./images/rain.png" />';
      break;
    case 82:
      weather = "Violent Rain Shower";
      icon = '<img src="./images/rain.png" />';
      break;
    case 85:
      weather = "Slight Snow Shower";
      icon = '<img src="./images/snow.png" />';
      break;
    case 86:
      weather = "Moderate Snow Shower";
      icon = '<img src="./images/snow.png" />';
      break;
    case 95:
      weather = "Slight Thunderstorm";
      icon = '<img src="./images/thunderstorm.png" />';
      break;
    case 96:
      weather = "Thuderstorm with slight hail";
      icon = '<img src="./images/thunderstorm.png" />';
      break;
    case 99:
      weather = "Thuderstorm with heavy hail";
      icon = '<img src="./images/thunderstorm.png" />';
      break;
  }
  let arr = [weather, icon];
  return arr;
}
