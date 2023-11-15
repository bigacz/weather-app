import { getHours } from 'date-fns';

const apiKey = '2c0b6ab60c524b50a4b165549230211';
let cacheData;

// Updating Data //

async function updateInitial() {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=auto:ip&days=3`
  );
  cacheData = await response.json();
}

async function updateByTown(town) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${town}&days=3`
  );
  cacheData = await response.json();
}

// Getting Data //

function getData() {
  return cacheData;
}

function getLocationData() {
  const { location } = cacheData;

  const data = {
    country: location.country,
    location: location.name,
    time: location.localtime,
  };

  return data;
}

function getCurrentData() {
  const { current } = cacheData;
  const { forecast } = cacheData;

  const currentDate = new Date(cacheData.location.localtime);
  const currentHour = getHours(currentDate);
  const currentHourData = forecast.forecastday[0].hour[currentHour];

  const data = {
    celsius: Math.round(current.temp_c),
    fahrenheit: Math.round(current.temp_f),
    cloud: current.cloud,
    gustKph: current.gust_kph,
    gustMph: current.gust_mph,
    humidity: current.humidity,
    // TODO: check if works at different hours //
    rainChance: currentHourData.chance_of_rain,
    snowChance: currentHourData.chance_of_snow,
    //
    precip: current.precip_mm,
  };

  return data;
}

function getDaysData() {
  const unprocessedDays = cacheData.forecast.forecastday;

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

function getHoursData() {
  const unprocessedDays = cacheData.forecast.forecastday;
  const unprocessedHours = unprocessedDays.map((day) => day.hour);

  const processedHours = unprocessedHours.map((hours) =>
    extractHoursData(hours)
  );

  return processedHours;
}

// TESTING //

updateByTown('Klobuck').then(() => {
  console.log(getData());
  console.log(getLocationData());
  console.log(getCurrentData());
  console.log(getDaysData());
  console.log(getHoursData());
});

//

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
