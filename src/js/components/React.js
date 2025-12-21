

let states = {};




export function setState(key, value) {
  states[key] = value;
}



export function getState(key) {
  return states[key];
}



export function renderComponent(component, props, prevStates) {
    prevStates = states;

    let elements = component(props || {});

    // Get the app element from the DOM
    let app = document.getElementById("app");


    app.innerHTML = "";
    app.appendChild(elements);


}


export function createRoot(rootElement) {

  
  return {
    render: function(component) {
      let elem = component(props || {});

      rootElement.innerHTML = "";
      rootElement.appendChild(elem);

    }
  };
}