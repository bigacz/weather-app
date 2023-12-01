import { format, setHours } from 'date-fns';
import IconManager from './iconManager';

let useImperial = false;

const hourTemplate = document.getElementById('hour-weather_template');
const mainContainer = document.getElementById('hour-weather_container');

function updateHours(hours) {
  clearDisplay();
  const allDays = hours.flat();
  allDays.forEach((element) => {
    addHour(element);
  });
}

function clearDisplay() {
  mainContainer.replaceChildren();
}

function toggleImperial(futureImperial) {
  useImperial = futureImperial;
}

// Helper functions

function addHour(hour) {
  const hourNode = hourTemplate.content.cloneNode(true);

  setDate(hourNode, hour);
  setIcon(hourNode, hour);
  setTemperature(hourNode, hour);
  setPrecip(hourNode, hour);

  mainContainer.appendChild(hourNode);
}

function setTemperature(hourNode, hour) {
  const temperatureDisplay = hourNode.querySelector(
    '.hour-weather_temperature'
  );
  let temperatureContent;
  if (useImperial) {
    temperatureContent = `${hour.fahrenheit} °F`;
  } else {
    temperatureContent = `${hour.celsius} °C`;
  }
  temperatureDisplay.textContent = temperatureContent;
}

function setIcon(hourNode, hour) {
  const iconDisplay = hourNode.querySelector('.hour-weather_weather-icon');
  const icon = IconManager.getWeatherIcon(hour.weatherCode);
  iconDisplay.src = icon;
}

function setDate(hourNode, hour) {
  const dateDisplay = hourNode.querySelector('.hour-weather_date');
  const hourDate = setHours(new Date(), hour.hour);
  const formattedDate = format(hourDate, 'h a');
  dateDisplay.textContent = formattedDate;
}

function setPrecip(hourNode, hour) {
  const precipDisplay = hourNode.querySelector('.hour-weather_precip');
  const isSnowGreater = hour.snowChance > hour.rainChance;

  let precipContent;
  if (isSnowGreater) {
    precipContent = `${hour.snowChance}% Snow`;
  } else {
    precipContent = `${hour.rainChance}% Rain`;
  }
  precipDisplay.textContent = precipContent;
}

const HoursDisplay = {
  updateHours,
  toggleImperial,
};

export default HoursDisplay;
