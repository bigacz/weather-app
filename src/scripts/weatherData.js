import { getHours } from 'date-fns';

const apiKey = '2c0b6ab60c524b50a4b165549230211';
let cacheData;

// Updating Data //

async function updateByTown(town) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${town}&days=3`
  );

  if (!response.ok) {
    const error = new Error('Fetch error');
    error.text = getErrorText(response.status);
    throw error;
  }

  const responseData = await response.json();
  cacheData = processAllData(responseData);
}

// Processing Data //

function processAllData(unprocessed) {
  const processedData = {
    current: processCurrentData(unprocessed),
    days: processDaysData(unprocessed),
    hours: processHoursData(unprocessed),
  };

  return processedData;
}

function processCurrentData(unprocessed) {
  const { current } = unprocessed;
  const { forecast } = unprocessed;
  const { location } = unprocessed;

  const currentDate = new Date(unprocessed.location.localtime);
  const currentHour = getHours(currentDate);
  const currentHourData = forecast.forecastday[0].hour[currentHour];

  const processedCurrent = {
    celsius: Math.round(current.temp_c),
    fahrenheit: Math.round(current.temp_f),
    cloud: current.cloud,
    windKph: current.wind_kph,
    windMph: current.wind_mph,
    humidity: current.humidity,
    rainChance: currentHourData.chance_of_rain,
    snowChance: currentHourData.chance_of_snow,
    isDay: current.is_day,
    precip: current.precip_mm,
    conditionText: current.condition.text,
    country: location.country,
    town: location.name,
    time: location.localtime,
  };

  const weatherCode = getWeatherCode(processedCurrent);
  processedCurrent.weatherCode = weatherCode;

  return processedCurrent;
}

function processDaysData(unprocessed) {
  const unprocessedDays = unprocessed.forecast.forecastday;

  const processedDays = unprocessedDays.map((day) => {
    const averageCloud = calculateAverageClouds(day.hour);
    const weatherData = day.day;

    const processedDay = {
      date: new Date(day.date),
      celsius: Math.round(weatherData.avgtemp_c),
      fahrenheit: Math.round(weatherData.avgtemp_f),
      rainChance: weatherData.daily_chance_of_rain,
      snowChance: weatherData.daily_chance_of_snow,
      conditionText: weatherData.condition.text,
      conditionCode: weatherData.condition.code,
      cloud: averageCloud,
    };

    const weatherCode = getWeatherCode(processedDay);
    processedDay.weatherCode = weatherCode;

    return processedDay;
  });

  return processedDays;
}

function processHoursData(unprocessed) {
  const unprocessedDays = unprocessed.forecast.forecastday;
  const unprocessedHours = unprocessedDays.map((day) => day.hour);

  const currentHour = getHours(new Date(unprocessed.location.localtime));
  unprocessedHours[0].splice(0, currentHour);

  const processedHours = unprocessedHours.map((hours) =>
    extractHoursData(hours)
  );

  return processedHours;
}

// Getters //

function getCurrentData() {
  return cacheData.current;
}

function getDaysData() {
  return cacheData.days;
}

function getHoursData() {
  return cacheData.hours;
}

// Helper functions //

function extractHoursData(unprocessedHours) {
  const processed = unprocessedHours.map((hour) => {
    const date = new Date(hour.time);

    const processedHour = {
      hour: getHours(date),
      rainChance: hour.chance_of_rain,
      snowChance: hour.chance_of_snow,
      cloud: hour.cloud,
      isDay: hour.is_day,
      celsius: Math.round(hour.temp_c),
      fahrenheit: Math.round(hour.temp_f),
    };

    const weatherCode = getWeatherCode(processedHour);
    processedHour.weatherCode = weatherCode;

    return processedHour;
  });

  return processed;
}

function calculateAverageClouds(hours) {
  const cloudSum = hours.reduce(
    (accumulator, currentValue) => accumulator + currentValue.cloud,
    0
  );

  return Math.round(cloudSum / 24);
}

function getWeatherCode(weather) {
  const { cloud } = weather;
  const { rainChance } = weather;
  const { snowChance } = weather;

  let code;
  if (Object.hasOwn(weather, 'isDay')) {
    const isDay = Number(weather.isDay) === 1;
    if (isDay) {
      code = 1;
    } else {
      code = 2;
    }
  } else {
    code = 1;
  }
  if (cloud > 50) {
    code = 3;
  }
  if (rainChance > 30) {
    code = 4;
  }
  if (snowChance > 15) {
    code = 5;
  }

  return code;
}

function getErrorText(code) {
  let errorText;
  switch (+code) {
    case 400:
      errorText = 'No town like that';
      break;
    case 403:
      errorText = 'Bad API key';
      break;
    case 404:
      errorText = '';
      break;
    default:
      errorText = 'Something happened';
      break;
  }

  return errorText;
}

const WeatherData = {
  updateByTown,
  getCurrentData,
  getDaysData,
  getHoursData,
};

export default WeatherData;
