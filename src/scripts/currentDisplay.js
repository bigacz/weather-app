import { format } from 'date-fns';
import IconManager from './iconManager';

let useImperial = false;

const townDisplay = document.getElementById('current-weather_town');
const countryDisplay = document.getElementById('current-weather_country');
const temperatureDisplay = document.getElementById(
  'current-weather_temperature'
);
const windSpeedDisplay = document.getElementById('current-weather_wind-speed');
const humidityDisplay = document.getElementById('current-weather_humidity');
const weatherIconDisplay = document.getElementById('current-weather_icon');
const conditionTextDisplay = document.getElementById(
  'current-weather_condition-text'
);
const clockDisplay = document.getElementById('current-weather_clock');

const precipDisplay = document.getElementById('current-weather_precip');
const precipTextDisplay = document.getElementById(
  'current-weather_precip-text'
);
const precipIconDisplay = document.getElementById(
  'current-weather_precip-icon'
);

// Display functions //

function setTown(town) {
  townDisplay.textContent = `${town},`;
}

function setCountry(country) {
  countryDisplay.textContent = `${country}`;
}

function setTemperature(celsius, fahrenheit) {
  if (useImperial) {
    temperatureDisplay.textContent = `${fahrenheit}°F`;
  } else {
    temperatureDisplay.textContent = `${celsius}°C`;
  }
}

function setPrecip(rainChance, snowChance) {
  const isSnowGreater = snowChance > rainChance;

  let precipContent;
  let precipImageSrc;
  let precipText;
  if (isSnowGreater) {
    precipContent = `${snowChance}%`;
    precipImageSrc = IconManager.getWeatherIcon(5);
    precipText = 'Snow';
  } else {
    precipContent = `${rainChance}%`;
    precipImageSrc = IconManager.getWeatherIcon(4);
    precipText = 'Rain';
  }

  precipDisplay.textContent = precipContent;
  precipIconDisplay.src = precipImageSrc;
  precipTextDisplay.textContent = precipText;
}

function setWindSpeed(kilometers, miles) {
  let units;
  if (useImperial) {
    units = `${Math.round(miles)} mph`;
  } else {
    units = `${Math.round(kilometers)} kph`;
  }

  windSpeedDisplay.textContent = units;
}

function setHumidity(humidity) {
  humidityDisplay.textContent = `${humidity}%`;
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
  setTown,
  setCountry,
  setTemperature,
  setPrecip,
  setWindSpeed,
  setHumidity,
  setWeatherIcon,
  setConditionText,
  toggleImperial,
  setClock,
};

export default CurrentDisplay;
