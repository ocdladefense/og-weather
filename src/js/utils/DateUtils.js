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
    console.log(date);

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
  toString() {
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
}
