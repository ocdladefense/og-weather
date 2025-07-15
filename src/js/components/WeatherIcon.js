


export default function WeatherIcon(day) {

    let img = document.createElement("img");
    img.src = `http://openweathermap.org/img/w/${day.getIcon()}.png`;
    img.alt = day.getDescription();


    return img;
}