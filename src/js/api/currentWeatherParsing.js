
import Sample from "../models/Sample";


export default function parseWeather(data){

    let weather = new Sample(data)
    return weather;
}