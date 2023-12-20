import PubSub from 'pubsub-js';

import CurrentDisplay from './currentDisplay';
import DaysDisplay from './daysDisplay';
import HoursDisplay from './hoursDisplay';
import WeatherData from './weatherData';
import BackgroundManager from './backgroundManager';
import searchForm from './searchForm';
import LoadingModal from './loadingModal';

PubSub.subscribe('locationChange', handleLocationChange);
PubSub.subscribe('unitsChange', (message, useImperial) => {
  changeUnits(useImperial);
  reloadDisplays();
});

async function handleLocationChange(message, location) {
  try {
    LoadingModal.showModal();
    const response = await WeatherData.updateByTown(location);

    reloadDisplays();
    LoadingModal.hideModal();
  } catch (error) {
    LoadingModal.hideModal();
    searchForm.displayError(error.text);
  }
}

function reloadDisplays() {
  const currentData = WeatherData.getCurrentData();
  const daysData = WeatherData.getDaysData();
  const hoursData = WeatherData.getHoursData();

  setCurrentDisplay(currentData);
  setDaysDisplay(daysData);
  setHoursDisplay(hoursData);
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

  BackgroundManager.changeBackground(current.weatherCode);
}

function setDaysDisplay(days) {
  DaysDisplay.updateDays(days);
}

function setHoursDisplay(hours) {
  HoursDisplay.updateHours(hours);
}

function changeUnits(useImperial) {
  CurrentDisplay.toggleImperial(useImperial);
  DaysDisplay.toggleImperial(useImperial);
  HoursDisplay.toggleImperial(useImperial);
}

handleLocationChange('', 'auto:ip');

// Helper //

export default {};
