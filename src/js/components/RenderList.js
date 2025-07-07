import WeatherList from "./WeatherList";  
  
  export default function RenderList({ forecast, onSubmit }) {
    let $form = document.querySelector("#zipForm");
    $form.addEventListener("submit", onSubmit);

    return WeatherList(forecast);
  }