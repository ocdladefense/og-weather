import Forecast from "./Forecast.js";
import DateUtils from "../utils/DateUtils.js";
import Sample from "./Sample.js";

// Class that contains all the forecast array data.
export default class SampleCollection {

  #samples;

  

  constructor(apiData, units, timezoneOffset) {

    this.#samples = apiData.map((data) => {
      let sample = Sample.fromOpenWeatherMap(data, units, timezoneOffset);

      return sample;
    });


  }


  groupBy(groupByMethod = "date") {

    switch (groupByMethod) {
      case "date":
        return this.groupByDate();
        break;

      default:
        throw new Error(`Unknown groupBy method: ${groupByMethod}`);
    }
  }

  groupByDate() {
    return Object.groupBy(this.#samples, (sample) => {
      let d = sample.getDateTime();

      return d.toString();
    });
  }

  


}
