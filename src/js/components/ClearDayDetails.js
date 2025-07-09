// Clear the HTML of the current day details
export default function ClearDayDetails() {
  let currentDay = document.getElementById("current-day");
  let oldDetails = document.getElementById("current-day-details");

  if (oldDetails && currentDay.contains(oldDetails)) {
    let emptyDiv = document.createElement("div");
    emptyDiv.setAttribute("id", "current-day-details");
    emptyDiv.classList.add("current-day-details");
    currentDay.replaceChild(emptyDiv, oldDetails);
  } 
}
