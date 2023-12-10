import { format } from 'date-fns';
import IconManager from './iconManager';

let useImperial = false;

const locationDisplay = document.getElementById('current-weather_location');
const temperatureDisplay = document.getElementById(
  'current-weather_temperature'
);
const rainChanceDisplay = document.getElementById(
  'current-weather_rain-chance'
);
const windSpeedDisplay = document.getElementById('current-weather_wind-speed');
const humidityDisplay = document.getElementById('current-weather_humidity');
const weatherIconDisplay = document.getElementById('current-weather_icon');
const conditionTextDisplay = document.getElementById(
  'current-weather_condition-text'
);
const clockDisplay = document.getElementById('current-weather_clock');

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
  const icon = IconManager.getWeatherIcon(code);

  weatherIconDisplay.src = icon;
}

function setConditionText(text) {
  conditionTextDisplay.textContent = text;
}

function setClock(time) {
  const formattedTime = format(new Date(time), 'hh:mm a');

  clockDisplay.textContent = formattedTime;
}

function toggleImperial(futureImperial) {
  useImperial = futureImperial;
}

const CurrentDisplay = {
  setLocation,
  setTemperature,
  setRainChance,
  setWindSpeed,
  setHumidity,
  setWeatherIcon,
  setConditionText,
  toggleImperial,
  setClock,
};

export default CurrentDisplay;
