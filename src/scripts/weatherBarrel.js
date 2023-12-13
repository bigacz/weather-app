import CurrentDisplay from './currentDisplay';
import DaysDisplay from './daysDisplay';
import HoursDisplay from './hoursDisplay';
import WeatherData from './weatherData';

const searchInput = document.getElementById('search-town-input');
const searchInputError = document.getElementById('search-town-input-error');
const searchSubmitButton = document.getElementById('search-submit');

searchSubmitButton.addEventListener('click', (event) => {
  const location = searchInput.value;
  handleLocationChange(location);
  event.preventDefault();
});

async function handleLocationChange(location) {
  try {
    const response = await WeatherData.updateByTown(location);

    const currentData = WeatherData.getCurrentData();
    const daysData = WeatherData.getDaysData();
    const hoursData = WeatherData.getHoursData();

    console.log(currentData);
    console.log(daysData);
    console.log(hoursData);

    setCurrentDisplay(currentData);
    setDaysDisplay(daysData);
    setHoursDisplay(hoursData);
  } catch (error) {
    displayError(error.text);
  }
}

function setCurrentDisplay(current) {
  CurrentDisplay.setTemperature(current.celsius, current.fahrenheit);
  CurrentDisplay.setClock(current.time);
  CurrentDisplay.setTown(current.town);
  CurrentDisplay.setCountry(current.country);
  CurrentDisplay.setPrecip(current.rainChance, current.snowChance);
  CurrentDisplay.setWindSpeed(current.windKph, current.windMph);
  CurrentDisplay.setHumidity(current.humidity);
  CurrentDisplay.setWeatherIcon(current.weatherCode);
  CurrentDisplay.setConditionText(current.conditionText);
}

function setDaysDisplay(days) {
  DaysDisplay.updateDays(days);
}

function setHoursDisplay(hours) {
  HoursDisplay.updateHours(hours);
}

function toggleImperial(useImperial) {
  CurrentDisplay.toggleImperial(useImperial);
  DaysDisplay.toggleImperial(useImperial);
  HoursDisplay.toggleImperial(useImperial);
}

function displayError(errorText) {
  searchInputError.textContent = errorText;
}

// Helper //

export default {};

// Testing //
searchInput.value = 'auto:ip';
searchSubmitButton.click();
