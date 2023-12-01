import CurrentDisplay from './currentDisplay';
import DaysDisplay from './daysDisplay';
import HoursDisplay from './hoursDisplay';
import WeatherData from './weatherData';

const searchInput = document.getElementById('search-town-input');
const searchSubmitButton = document.getElementById('search-submit');

searchSubmitButton.addEventListener('click', (event) => {
  const location = searchInput.value;
  handleLocationChange(location);
  event.preventDefault();
});

async function handleLocationChange(location) {
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
}

function setCurrentDisplay(current) {
  CurrentDisplay.setTemperature(current.celsius, current.fahrenheit);
  CurrentDisplay.setLocation(current.town, current.country);
  CurrentDisplay.setRainChance(current.rainChance);
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

// Helper //

export default {};

// Testing //
searchInput.value = 'auto:ip';
searchSubmitButton.click();
