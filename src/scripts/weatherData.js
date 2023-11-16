import { getHours } from 'date-fns';

const apiKey = '2c0b6ab60c524b50a4b165549230211';
let cacheData;

// Updating Data //

async function updateInitial() {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=auto:ip&days=3`
  );

  const responseData = await response.json();
  cacheData = processAllData(responseData);
}

async function updateByTown(town) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${town}&days=3`
  );
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

  console.log(unprocessed);
  const data = {
    celsius: Math.round(current.temp_c),
    fahrenheit: Math.round(current.temp_f),
    cloud: current.cloud,
    windKph: current.wind_kph,
    windMph: current.wind_mph,
    humidity: current.humidity,
    // TODO: check if works at different hours //
    rainChance: currentHourData.chance_of_rain,
    snowChance: currentHourData.chance_of_snow,
    //
    precip: current.precip_mm,
    country: location.country,
    town: location.name,
    time: location.localtime,
  };

  return data;
}

function processDaysData(unprocessed) {
  const unprocessedDays = unprocessed.forecast.forecastday;

  const processedDays = unprocessedDays.map((day) => {
    const averageCloud = calculateAverageClouds(day.hour);
    const weatherData = day.day;

    const processedDay = {
      date: new Date(day.date),
      averageCelsius: weatherData.avgtemp_c,
      averageFahrenheit: weatherData.avgtemp_f,
      rainChance: weatherData.daily_chance_of_rain,
      snowChance: weatherData.daily_chance_of_snow,
      cloud: averageCloud,
    };

    return processedDay;
  });

  return processedDays;
}

function processHoursData(unprocessed) {
  const unprocessedDays = unprocessed.forecast.forecastday;
  const unprocessedHours = unprocessedDays.map((day) => day.hour);

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
    };

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

const WeatherData = {
  updateInitial,
  updateByTown,
  getCurrentData,
  getDaysData,
  getHoursData,
};

export default WeatherData;

// TESTING //

/* 
  updateByTown('Warsaw').then(() => {
    console.log(getCurrentData());
    console.log(getDaysData());
    console.log(getHoursData());
  });
*/

//
