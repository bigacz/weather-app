import WeatherData from './weatherData';

const useImperial = false;

const temperatureDisplay = document.getElementById(
  'current-weather_temperature'
);

function setTemperature(celsius, fahrenheit) {
  if (useImperial) {
    temperatureDisplay.textContent = `${fahrenheit} °F`;
  } else {
    temperatureDisplay.textContent = `${celsius} °C`;
  }
}

// TESTING

const searchInput = document.getElementById('search-town-input');
const searchSubmitButton = document.getElementById('search-submit');

searchSubmitButton.addEventListener('click', (event) => {
  const location = searchInput.value;
  WeatherData.updateByTown(location).then((response) => {
    const data = WeatherData.getCurrentData();
    setTemperature(data.celsius, data.fahrenheit);
    console.log(data);
  });
  event.preventDefault();
});

export default {};
