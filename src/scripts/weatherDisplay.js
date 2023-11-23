import sunIcon from '../assets/sun.svg';
import moonIcon from '../assets/moon.svg';
import cloudIcon from '../assets/cloud.svg';
import rainIcon from '../assets/rain.svg';
import snowIcon from '../assets/snow.svg';

const useImperial = false;

const locationDisplay = document.getElementById('current-weather_location');
const temperatureDisplay = document.getElementById(
  'current-weather_temperature'
);
const rainChanceDisplay = document.getElementById('current-weather_rainChance');
const windSpeedDisplay = document.getElementById('current-weather_windSpeed');
const humidityDisplay = document.getElementById('current-weather_humidity');
const weatherIconDisplay = document.getElementById('current-weather_icon');

// Display functions //

function setLocation(town, country) {
  locationDisplay.textContent = `${town}, ${country}`;
}

function setTemperature(celsius, fahrenheit) {
  if (useImperial) {
    temperatureDisplay.textContent = `${fahrenheit} °F`;
  } else {
    temperatureDisplay.textContent = `${celsius} °C`;
  }
}

function setRainChance(rainChance) {
  rainChanceDisplay.textContent = `${rainChance}%`;
}

function setWindSpeed(kilometers, miles) {
  if (useImperial) {
    windSpeedDisplay.textContent = `${miles} mph`;
  } else {
    windSpeedDisplay.textContent = `${kilometers} kph`;
  }
}

function setHumidity(humidity) {
  humidityDisplay.textContent = `${humidity} %`;
}

function setWeatherIcon(code) {
  let image;
  switch (code) {
    case 1:
      image = sunIcon;
      break;
    case 2:
      image = moonIcon;
      break;
    case 3:
      image = cloudIcon;
      break;
    case 4:
      image = rainIcon;
      break;
    case 5:
      image = snowIcon;
      break;
    default:
      image = sunIcon;
  }

  weatherIconDisplay.src = image;
}

const WeatherDisplay = {
  setLocation,
  setTemperature,
  setRainChance,
  setWindSpeed,
  setHumidity,
  setWeatherIcon,
};

export default WeatherDisplay;
