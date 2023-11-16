import WeatherDisplay from './weatherDisplay';
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

  console.log(currentData);

  setCurrentDisplays(currentData);
}

function setCurrentDisplays(current) {
  WeatherDisplay.setTemperature(current.celsius, current.fahrenheit);
  WeatherDisplay.setLocation(current.town, current.country);
  WeatherDisplay.setRainChance(current.rainChance);
  WeatherDisplay.setWindSpeed(current.windKph, current.windMph);
}
export default {};
