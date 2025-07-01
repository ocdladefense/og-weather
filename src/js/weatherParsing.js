import "./forecast";
import "./forecastCollection";
import { getDateKeysToUse } from "./dates";

/* Algorithm:
  Step 1: Retreive forecast array, usually containing 40 entries, and group them together based on their fulldate.
  Step 2: Calculate the 5 date keys that will be used for the 5 day weather forecast.
  Step 3: Populate each forecast day of the 5 date keys.
  Step 4: Push each forecast day into an array and return it.
*/

// // Returns local time for the users location.
// function getLocalTime(timezoneOffset) {
//   let currentUTC = Math.floor(Date.now() / 1000); // now in seconds.
//   let localNow = new Date((currentUTC + timezoneOffset) * 1000);

//   return localNow;
// }

// // Function that returns a sorted array containing unique date keys in the "YYYY-MM-DD" format.
// function getSortedDateKeys(forecast) {
//   let grouped = Object.groupBy(forecast, groupByFullDate);

//   return Object.keys(grouped).sort();
// }

// // Function that will take an array of unique date keys and a date object and returns the index of the startdate.
// function findStartIndex(sortedKeys, startDate) {
//   let startKey = getAsFullDateString(startDate);
//   let index = sortedKeys.indexOf(startKey);

//   if (index === -1) {
//     // If the index doesnt exist, find the first date in sortedKeys that is equal to or later than startDate.
//     index = sortedKeys.findIndex((key) => new Date(key) >= startDate);
//     if (index === -1) index = 0; // Use first index as a fallback.
//   }

//   return index;
// }

// Default function to be used in weather.js
// Returns an array holding 5 oneDay objects to be displayed to the user.
export default function parseForecast(forecast, timezoneOffset) {
  let simpleForecast = new Array(); //initialize array

  let groups = new ForecastCollection(forecast, timezoneOffset);

  let dateKeysToUse = getDateKeysToUse();

  //Iterates through each dateKey
  for (let dateKey of dateKeysToUse) {
    let day = groups.getDayForecast(dateKey);

    let oneDay = day.buildDaySummary(); // Populate the oneDay object with forecast data for the single day.

    simpleForecast.push(oneDay);
  }

  return simpleForecast;
}
