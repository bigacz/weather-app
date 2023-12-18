import 'normalize.css';
import './styles/general.css';
import './styles/current.css';
import './styles/days.css';
import './styles/hours.css';
import './styles/searchForm.css';

import WeatherBarrel from './scripts/weatherBarrel';

// Testing

const searchInput = document.getElementById('search-town_input');
const searchSubmitButton = document.getElementById('search-town_submit');

searchInput.value = 'auto:ip';
searchSubmitButton.click();
