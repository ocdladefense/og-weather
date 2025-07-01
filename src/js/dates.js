// Utility functions that manipulate JS dates

// returns a JS date object based on a unix timestamp and the timezone offset
export function getDate(unixTimestamp, timezoneOffset) {
  return new Date((unixTimestamp - timezoneOffset) * 1000);
}

// returns a string that represents the day of the week based on a JS date object
export function getWeekday(date) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = date.getDay();
  return dayNames[weekday];
}

// Function that returns a date object in the users local time
export function groupByFullDate(entry) {
  let timezoneOffset = entry.timezone || 0; // Default to 0 if no timezone is provided
  let local = (entry.dt + timezoneOffset) * 1000; // Shift to forecast location’s local time
  let date = new Date(local);

  return getAsFullDateString(date);
}

// Function that converts a js date object into a string.
export function getAsFullDateString(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
}

export function getDateKeysToUse(numDays = 5, startDate = new Date()) {
  let dateKeys = [startDate];

  for (let i = 1; i < numDays; i++) {
    let d = new Date(startDate);
    let day = d.getDate();
    day = day + i;
    d.setDate(day);
    dateKeys.push(d);
  }
  console.log(dateKeys);
  return dateKeys.map(getAsFullDateString);
  // return [startDate, startDate + 1, startDate + 2, startDate + 3, startDate + 4];
}
