// Utility functions that manipulate JS dates

export default class DateUtils extends Date {



  constructor(date) {
    super(date);
  }

  // Returns a string that represents the day of the week based on a JS date object
  getWeekday() {

    return DateUtils._getWeekday(this);

  }


  // takes in a date object, not a string
  static _getWeekday(date) {

    date = date instanceof DateUtils ? date : new DateUtils(date);


    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return dayNames[date.getDay()+1];
  }


  // Function that converts a js date object into a string.
  toLabel() {
    let year = this.getFullYear();
    let month = String(this.getMonth() + 1).padStart(2, "0");
    let day = String(this.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Returns a range of date utils objects.
  static createRange(startDate, numDays) {
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


  static toDateTimeString(dateString, timeString = "00:00:00.000"){
    return dateString + "T" + timeString;
  }



  // dateLabel is in the form of "2024-02-04"
  static getFormattedDate(dateLabel) {

    let d = new DateUtils(DateUtils.toDateTimeString(dateLabel)); 


    let month = d.getMonth() + 1;
    let day = d.getDate();

    return [month,day].join("/");
  }

  // // Converts the date to a DateUtils object with ISO string in correct offset
  // static toTimezoneOffset(date, timezoneOffset) {
  //   let pad = (num) => String(num).padStart(2, '0');

  //   // The `Date` object already handles the UTC to local conversion
  //   // when you create it from a timestamp.
  //   let year = date.getFullYear();
  //   let month = pad(date.getMonth() + 1);
  //   let day = pad(date.getDate());
  //   let hours = pad(date.getHours());
  //   let minutes = pad(date.getMinutes());
  //   let seconds = pad(date.getSeconds());
  //   let ms = String(date.getMilliseconds()).padStart(3, '0');

  //   // The offset is for formatting only.
  //   let sign = timezoneOffset >= 0 ? '+' : '-';
  //   let absOffset = Math.abs(timezoneOffset);
  //   let offsetHours = pad(Math.floor(absOffset / 3600));
  //   let offsetMinutes = pad((absOffset % 3600) / 60);

  //   let ISOString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}${sign}${offsetHours}:${offsetMinutes}`;

  //   return new DateUtils(ISOString);
  // }

  // Converts the date to a DateUtils object with ISO string in correct offset
  toTimezoneOffset(timezoneOffset) {    

    let offsetInSeconds = this.getTimezoneOffset() * 60;

    let shouldConvert = ((timezoneOffset * -1) != offsetInSeconds);
    if (!shouldConvert) {
      return this;
    }

    let unixTimestampInMS = this.getTime();

    let offsetInMs = timezoneOffset * 1000;

    let localTimeMs = unixTimestampInMS - offsetInMs; // Subtract because offset is minutes to *add* to local to get UTC

    return new DateUtils(localTimeMs);
  }

}

