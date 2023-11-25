import { format } from 'date-fns';
import IconManager from './iconManager';

const mainContainer = document.getElementById('day-weather_container');

function setDays(daysData) {
  daysData.forEach((day) => {
    createDay(day);
  });
}

// Helper functions

function createDay(day) {
  const dateDisplay = document.createElement('p');
  const formattedDate = format(day.date, 'EEEE');
  dateDisplay.textContent = formattedDate;

  const iconDisplay = document.createElement('img');
  const icon = IconManager.getWeatherIcon(day.weatherCode);
  iconDisplay.src = icon;
  //

  const dayContainer = document.createElement('div');
  dayContainer.appendChild(dateDisplay);
  dayContainer.appendChild(iconDisplay);

  mainContainer.appendChild(dayContainer);
}

const DaysDisplay = {
  setDays,
};

export default DaysDisplay;
