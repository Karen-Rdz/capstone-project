import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Finish from "./components/Finish/Finish";
import Header from "./components/Header/Header";
import Login from './components/Login/Login';
import Map from "./components/Map/Map";
import NumberStops from "./components/NumberStops/NumberStops";
import Planner from "./components/Planner/Planner";
import Summary from "./components/Summary/Summary";
import Trips from "./components/Trips/Trips";
const API_KEY = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc"

function App() {
  const [origin, setOrigin] = React.useState();
  const [destination, setDestination] = React.useState();

  return (
    <div className='app'>
      <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route
            path="/"
            element={ <Login /> }
          />
          <Route
            path="/route"
            element={ <NumberStops origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination}/> }
          />
          <Route
            path="/planner"
            element={ <Planner origin={origin} destination={destination}/> }
          />
          <Route
            path="/summary"
            element={ <Summary /> }
          />
          <Route
            path="/trips"
            element={ <Trips /> }
          />
          <Route
            path="/finish"
            element={ <Finish /> }
          />
        </Routes>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
