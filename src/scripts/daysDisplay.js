import { format } from 'date-fns';
import IconManager from './iconManager';

let useImperial = false;

const dayTemplate = document.getElementById('day-weather_template');
const mainContainer = document.getElementById('day-weather_container');

function updateDays(daysData) {
  clearDisplay();
  daysData.forEach((day) => {
    addDay(day);
  });
}

function clearDisplay() {
  mainContainer.replaceChildren();
}

// Helper functions

function addDay(day) {
  const dayNode = dayTemplate.content.cloneNode(true);

  setDate(dayNode, day);
  setIcon(dayNode, day);
  setTemperature(dayNode, day);
  setPrecip(dayNode, day);

  mainContainer.appendChild(dayNode);
}

function setPrecip(dayNode, day) {
  const precipDisplay = dayNode.querySelector('.day-weather_precip');
  const isSnowGreater = day.snowChance > day.rainChance;

  let precipContent;
  if (isSnowGreater) {
    precipContent = `${day.snowChance}% Snow`;
  } else {
    precipContent = `${day.rainChance}% Rain`;
  }
  precipDisplay.textContent = precipContent;
}

function setTemperature(dayNode, day) {
  const temperatureDisplay = dayNode.querySelector('.day-weather_temperature');
  let temperatureContent;
  if (useImperial) {
    temperatureContent = `${day.fahrenheit} °F`;
  } else {
    temperatureContent = `${day.celsius} °C`;
  }
  temperatureDisplay.textContent = temperatureContent;
}

function setIcon(dayNode, day) {
  const iconDisplay = dayNode.querySelector('.day-weather_weather-icon');
  const icon = IconManager.getWeatherIcon(day.weatherCode);
  iconDisplay.src = icon;
}

function setDate(dayNode, day) {
  const dateNode = dayNode.querySelector('.day-weather_date');
  const formattedDate = format(day.date, 'EEEE');
  dateNode.textContent = formattedDate;
}

function toggleImperial(futureImperial) {
  useImperial = futureImperial;
}

const DaysDisplay = {
  updateDays,
  toggleImperial,
};

export default DaysDisplay;
