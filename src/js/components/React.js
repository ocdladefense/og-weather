

const states = {};


export function setState(key, value) {

    states[key] = value;
}



export function getState(key) {
  return states[key];
}



export function renderComponent(component, props) {
    let elements = component(props || {});

    // Get the app element from the DOM
    let app = document.getElementById("app");

    // Clear existing forecast list, without this it was increasing exponentialy
    app.innerHTML = "";
    app.appendChild(elements);
}