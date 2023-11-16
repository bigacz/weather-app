const useImperial = false;

const locationDisplay = document.getElementById('current-weather_location');
const temperatureDisplay = document.getElementById(
  'current-weather_temperature'
);
const rainChanceDisplay = document.getElementById('current-weather_rainChance');
const windSpeedDisplay = document.getElementById('current-weather_windSpeed');

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

const WeatherDisplay = {
  setLocation,
  setTemperature,
  setRainChance,
  setWindSpeed,
};

export default WeatherDisplay;
