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

const location = {
  address: "1 Hacker Way, Menlo Park, CA 94025.",
  lat: 37.48525176224396,
  lng: -122.14830386019975,
};

function App() {
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
            path="/map"
            element={ <Map location={location} zoomLevel={17}/> }
          />
          <Route
            path="/route"
            element={ <NumberStops /> }
          />
          <Route
            path="/planner"
            element={ <Planner /> }
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
