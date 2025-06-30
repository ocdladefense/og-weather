/* Algorithm:
  Step 1: Retreive forecast array, usually containing 40 entries, and group them together based on their fulldate.
  Step 2: Calculate the 5 date keys that will be used for the 5 day weather forecast.
  Step 3: Populate each forecast day of the 5 date keys.
  Step 4: Push each forecast day into an array and return it.
*/

// Function that finds the closest hour match, because a match isn't always gonna be there since data is only given every 3 hours.
function findTempAtHourApprox(forecast, hour, timezoneOffset) {
  let closestEntry = null;
  let closestDiff = 24; // max hours in a day. Used to track the smallest difference between forecast hour and target hour.

  for (let f of forecast) {
    let localHour = new Date((f.dt + timezoneOffset) * 1000).getHours();
    let diff = Math.abs(localHour - hour);
    if (diff < closestDiff) {
      // If this is the closest match so far, remember it
      closestDiff = diff;
      closestEntry = f;
    }
  }

  return closestEntry ? closestEntry.main.temp : null;
  // returns the entry closest to the desired time.
}

// Function that finds the minimum temp in a forecast array.
function findMinTemp(forecast) {
  return Math.min(...forecast.map((f) => f.main.temp_min));
  // Loop through every forecast entry, extract its temp_min, and return the smallest one
}

// Function that finds the maximum temp in a forecast array.
function findMaxTemp(forecast) {
  return Math.max(...forecast.map((f) => f.main.temp_max));
}

// Function that returns a date object in the users local time
function groupByFullDate(entry) {
  let timezoneOffset = entry.timezone || 0; // Default to 0 if no timezone is provided
  let local = (entry.dt + timezoneOffset) * 1000; // Shift to forecast location’s local time
  let date = new Date(local);

  return getAsFullDateString(date);
}

// Function that converts a js date object into a string.
function getAsFullDateString(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
}

// Returns local time for the users location.
function getLocalTime(timezoneOffset) {
  let currentUTC = Math.floor(Date.now() / 1000); // now in seconds.
  let localNow = new Date((currentUTC + timezoneOffset) * 1000);

  return localNow;
}

// Function that returns a sorted array containing unique date keys in the "YYYY-MM-DD" format.
function getSortedDateKeys(forecast) {
  let grouped = Object.groupBy(forecast, groupByFullDate);

  return Object.keys(grouped).sort();
}

// Function that will take an array of unique date keys and a date object and returns the index of the startdate.
function findStartIndex(sortedKeys, startDate) {
  let startKey = getAsFullDateString(startDate);
  let index = sortedKeys.indexOf(startKey);

  if (index === -1) {
    // If the index doesnt exist, find the first date in sortedKeys that is equal to or later than startDate.
    index = sortedKeys.findIndex((key) => new Date(key) >= startDate);
    if (index === -1) index = 0; // Use first index as a fallback.
  }

  return index;
}

function getDateKeysToUse(numDays = 5, startDate, forecast) {
  let sortedKeys = getSortedDateKeys(forecast);
  let startIndex = findStartIndex(sortedKeys, startDate);

  return sortedKeys.slice(startIndex, startIndex + numDays);
}

// Class that contains all the forecast array data.
class ForecastCollection {
  #forecast = {};

  constructor(forecast, timezoneOffset) {
    this.#forecast = Object.groupBy(forecast, groupByFullDate);
    this.timezoneOffset = timezoneOffset;
  }

  // Function that returns a Forecast object, containing all the samples for that day.
  getDayForecast(dateString) {
    return new Forecast(this.#forecast[dateString] || [], this.timezoneOffset);
  }
}

// Class that processes weather forecast data for a single day.
class Forecast {
  // i.e., the forecast for a single day, takes in a collection of samples.
  constructor(samples, timezoneOffset) {
    this.samples = samples;
    this.timezoneOffset = timezoneOffset;
  }

  // This function finds the forecast entry closest to the given time.
  findClosestEntryToHour(hourToLookFor) {
    // Step 1: Find the closest entry to the specified hour
    let closestEntry = null;
    let closestDiff = 24; // max possible diff in hours

    for (let f of this.samples) {
      let localHour = new Date((f.dt + this.timezoneOffset) * 1000).getHours();
      let diff = Math.abs(localHour - hourToLookFor);
      if (closestEntry === null || diff < closestDiff) {
        closestDiff = diff;
        closestEntry = f;
      }
    }

    // Step 2: Fallbacks in case of empty data
    return closestEntry || this.samples[4] || this.samples[0] || null;
  }

  // This function will create and return an object holding one days worth of forecast data.
  buildDaySummary() {
    let oneDay = {}; // Create a new object to hold the day's forecast

    let noonEntry = this.findClosestEntryToHour(12);

    oneDay.dt = new Date((noonEntry.dt + this.timezoneOffset) * 1000);
    oneDay.temp = noonEntry.main.temp;
    oneDay.minTemp = findMinTemp(this.samples);
    oneDay.maxTemp = findMaxTemp(this.samples);
    oneDay.morningTemp = findTempAtHourApprox(
      this.samples,
      6,
      this.timezoneOffset
    );
    oneDay.dayTemp = findTempAtHourApprox(
      this.samples,
      12,
      this.timezoneOffset
    );
    oneDay.eveningTemp = findTempAtHourApprox(
      this.samples,
      18,
      this.timezoneOffset
    );
    oneDay.nightTemp = findTempAtHourApprox(
      this.samples,
      21,
      this.timezoneOffset
    );
    oneDay.description = noonEntry.weather?.[0]?.description ?? "";
    oneDay.icon = noonEntry.weather?.[0]?.icon ?? "";
    oneDay.pressure = noonEntry.main.pressure ?? null;
    oneDay.wind = noonEntry.wind.speed ?? null;
    oneDay.humidity = noonEntry.main.humidity ?? null;

    return oneDay;
  }
}

// Default function to be used in weather.js
// Returns an array holding 5 oneDay objects to be displayed to the user.
export default function parseForecast(forecast, timezoneOffset) {
  let simpleForecast = new Array(); //initialize array

  let groups = new ForecastCollection(forecast, timezoneOffset);

  let dateKeysToUse = getDateKeysToUse(
    5,
    getLocalTime(timezoneOffset),
    forecast
  );

  //Iterates through each dateKey
  for (let dateKey of dateKeysToUse) {
    let day = groups.getDayForecast(dateKey);

    let oneDay = day.buildDaySummary(); // Populate the oneDay object with forecast data for the single day.

    simpleForecast.push(oneDay);
  }

  return simpleForecast;
}
