/**
 * A simple React-like state management and rendering utility.
 */


let renderCount = 0;

let states = {};




export function setState(key, value) {
  states[key] = value;
}



export function getState(key) {
  return states[key];
}



export function useState(key, initialValue) {
  if(0 === renderCount && !(key in states)) {
    states[key] = initialValue;
  }
  return states[key];
}





function isStateChanged(previousStates, currentStates) {


  let keys = Object.keys(currentStates);
  for(let key of keys) {
    if(previousStates[key] !== currentStates[key]) {
      return true;
    }
  }
  return false;
}


export function createRoot(rootElement, props = {}) {


  return {
    render: function render(component, previousStates = {}) {
      let renderTree;

      
      if (renderCount === 0 || isStateChanged(previousStates, states)) {
        console.log("Render count: ", renderCount);
        previousStates = {...states};
        renderTree = component(props);
        // After executing the component function, new states will have been assigned to this modules states object.
        rootElement.innerHTML = "";
        rootElement.appendChild(renderTree);
        renderCount++;
      }

      setTimeout(() => { render(component, previousStates); }, 500);
    }
  };
}