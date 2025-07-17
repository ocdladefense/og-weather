
export default class Sample {

    sample;
    
    temp;
    wind;
    humidity;


    constructor(sample){
        this.sample = sample;
    }

    getTemperature(){
        return this.temp;
    }

    getWind() {
        return this.wind;
    }

    getHumidity() {
        return this.humidity;
    }

    static fromOpen(data){
        let sample = new Sample;
        sample.temp = data.main.temp;
        sample.wind = data.wind.speed;
        sample.humidity = data.main.humidity;
        



        return sample;
    }
}