import { format, setHours } from 'date-fns';
import IconManager from './iconManager';

const mainContainer = document.getElementById('hour-weather_container');

function addHour(hour) {
  const dateDisplay = document.createElement('p');

  const hourDate = setHours(new Date(), hour.hour);
  const formattedDate = format(hourDate, 'h a');
  dateDisplay.textContent = formattedDate;

  const iconDisplay = document.createElement('img');
  const icon = IconManager.getWeatherIcon(hour.weatherCode);
  iconDisplay.src = icon;

  //

  const hourContainer = document.createElement('div');
  hourContainer.appendChild(dateDisplay);
  hourContainer.appendChild(iconDisplay);

  mainContainer.appendChild(hourContainer);
}

const HoursDisplay = {
  addHour,
};

export default HoursDisplay;
