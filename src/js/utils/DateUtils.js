// Utility functions that manipulate JS dates

export default class DateUtils {
  date;

  constructor(date) {
    this.date = date instanceof Date ? date : new Date(date);
  }

  static fromUnixTimestamp(unixTimestamp, timezoneOffset = 0) {
    let date = new Date((unixTimestamp + timezoneOffset) * 1000);

    return new DateUtils(date);
  }

  // returns a string that represents the day of the week based on a JS date object
  static getWeekday(date) {

    let d = date instanceof Date ? date : new Date(date);

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return dayNames[d.getDay()];
  }

  // Function that converts a js date object into a string.
  toString() {
    let year = this.date.getFullYear();
    let month = String(this.date.getMonth() + 1).padStart(2, "0");
    let day = String(this.date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Returns a range of date utils objects.
  static createRange(numDays = 5, startDate = new Date()) {
    let range = [startDate];

    for (let i = 1; i < numDays; i++) {
      let d = new Date(startDate);
      let day = d.getDate();
      day = day + i;
      d.setDate(day);
      range.push(d);
    }

    return range.map((date) => new DateUtils(date));
  }

  
  static getFormattedDate(selectedDay) {
    return `${
      new Date(selectedDay.dt).getMonth() + 1
    }/${new Date(selectedDay.dt).getDate()}`;
  }
}
