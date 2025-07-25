import DateUtils from "../utils/DateUtils";


export default class Sample {

    #data;

    tempUnits;

    windUnits;

    #date;

    temp;

    wind;

    humidity;

    pressure;

    description;

    icon;
    


    constructor(data, timezoneOffset = 0){
        this.#data = data;
    }

    getData() {
        return this.#data;
    }

    getDateTime(){
        return this.#date;
    }

    setDateTime(date) {
        this.#date = new DateUtils(date);
    }

    getLocalHour() {
        return this.#date;
    }
    
    getTemperature(){
        return this.temp;
    }

    setTemperature(temp, tempUnits = "F") {
        this.temp = temp;
        this.tempUnits = tempUnits;
    }

    getWind() {
        return this.wind;
    }

    setWind(wind, windUnits = "mph") {
        this.wind = wind;
        this.windUnits = windUnits;
    }

    getHumidity() {
        return this.humidity;
    }

    getPressure(){
        return this.pressure;
    }

    getDescription(){
        return this.description;
    }

    getIcon(){
        return this.icon;
    }

    getTempUnits() {
        return this.tempUnits;
    }

    getWindUnits() {
        return this.windUnits;
    }

    static fromOpenWeatherMap(data, units = "standard", timezoneOffset = 0){
        let sample = new Sample(data, timezoneOffset);
        sample.#date = new DateUtils((data.dt + timezoneOffset) * 1000);
        console.log(sample.#date);
        sample.tempUnits = units == "metric" ? "celsius" : "fahrenheit"; 
        sample.windUnits = units == "metric" ? "m/s" : "mph"; 
        sample.temp = data.main.temp ?? null;
        sample.wind = data.wind.speed ?? null;
        sample.humidity = data.main.humidity ?? null;
        sample.pressure = data.main.pressure ?? null;
        sample.description = data.weather?.[0]?.description ?? "";
        sample.icon = data.weather?.[0]?.icon ?? "";


        return sample;
    }
}