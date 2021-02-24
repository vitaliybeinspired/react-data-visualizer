import React from "react"
import './App.css';
// use logo variable {logo} instead of url, faster?
import logo from "./logo512.png";

// a component is a function that returns UI
// props holds all different properties for components
function Header(props) {
  return (
    <header>
      <h1>{props.name} Application Components</h1>
    </header>
  );
}

// props (properties)
// ul is unordered list
function Main(props) {
  return (
    <section>
      <p> The most {props.adjective} epic UI </p> 
      <img src="https://www.energylivenews.com/wp-content/uploads/2019/05/satellite-powerplant.jpg" height={400}/>
      <ul style={{textAlign: "left"}}>
        {props.dishes.map((dish) => (
          <li key={dish.id}>{dish.title}</li> // each one of dishes displayed as a list
          // also have to use cameal case not text-align like in css but textAlign
          // keys keep the application in synch when the pages change...
        ))}
      </ul>
    </section>
  )
}

function Footer(props) {
  return (
    <footer>
      <p>Year {props.year}</p>
    </footer>
  )
}

// array of items might get out of sync when rendering dynamical so need objects
const dishes = [
  "Thermal",
  "Hydroelectric",
  "Wind"
]

const dishObjects = dishes.map((dish, i) => ({id: i, title: dish}));

// this is a component
function App() {
  return (
    <div className="App">
      <Header name="Vitaliy's"/>
      <Main adjective="amazing" dishes={dishObjects}/>
      <Footer year={new Date().getFullYear()}/>
    </div>
  );
}

export default App;
