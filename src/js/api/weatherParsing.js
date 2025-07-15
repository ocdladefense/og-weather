import ForecastCollection from "../models/ForecastCollection";
import DateUtils from "../utils/DateUtils";

/* Algorithm:
  Step 1: Retreive forecast array, usually containing 40 entries, and group them together based on their fulldate.
  Step 2: Calculate the 5 date keys that will be used for the 5 day weather forecast.
  Step 3: Populate each forecast day of the 5 date keys.
  Step 4: Push each forecast day into an array and return it.
*/

// Default function to be used in app.js
// Returns an array holding 5 oneDay objects to be displayed to the user.
export default function parseForecast(data, timezoneOffset = 0) {
  let forecast = new Array(); //initialize array

  let groups = new ForecastCollection(data, timezoneOffset);

  let range = DateUtils.createRange();

  let keys = range.map((date) => {
    return date.toString();
  });

  //Iterates through each dateKey
  for (let key of keys) {
    let day = groups.getDayForecast(key);

    let oneDay = day.buildDaySummary(); // Populate the oneDay object with forecast data for the single day.

    forecast.push(oneDay);
  }

  return forecast;
}
