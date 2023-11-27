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
  DaysDisplay.setDays(days);
}

function setHoursDisplay(hours) {
  HoursDisplay.addHour(hours[0][0]);
}

// Helper //

export default {};

// Testing //
searchInput.value = 'auto:ip';
searchSubmitButton.click();
