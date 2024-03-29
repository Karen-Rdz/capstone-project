import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import Finish from "./components/Finish/Finish";
import Header from "./components/Header/Header";
import Login from './components/Login/Login';
import NumberStops from "./components/NumberStops/NumberStops";
import Planner from "./components/Planner/Planner";
import Summary from "./components/Summary/Summary";
import Trips from "./components/Trips/Trips";

function App() {
  const [origin, setOrigin] = React.useState();
  const [destination, setDestination] = React.useState();
  const [user, setUser] = React.useState({});
  const [stops, setStops] = React.useState([]);
  const [stopsDist, setStopsDist] = React.useState(0);
  const [stopsTime, setStopsTime] = React.useState(0);
  const [stopsFuel, setStopsFuel] = React.useState(0);
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];
  return (
    <div className='app'>
      <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route
            path="/"
            element={ <Login setUser={setUser}/> }
          />
          <Route
            path="/route"
            element={ 
              <LoadScript googleMapsApiKey={key} libraries={lib}>
              <NumberStops origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination} stopsTime={stopsTime} setStopsTime={setStopsTime} stopsDist={stopsDist} setStopsDist={setStopsDist} stopsFuel={stopsFuel} setStopsFuel={setStopsFuel}/>
              </LoadScript>
            }
          />
          <Route
            path="/planner"
            element={ 
              <LoadScript googleMapsApiKey={key} libraries={lib}>
            <Planner origin={origin} destination={destination} user={user} stopsTime={stopsTime} stopsDist={stopsDist} stopsFuel={stopsFuel} stops={stops} setStops={setStops}/> 
            </LoadScript>
            }
          />
          <Route
            path="/summary"
            element={ <Summary /> }
          />
          <Route
            path='/trips'
            element={ <Trips setOrigin={setOrigin} setDestination={setDestination} setUser={setUser} setStops={setStops} setStopsDist={setStopsDist} setStopsTime={setStopsTime} setStopsFuel={setStopsFuel}/> }
          />
          <Route
            path="/finish"
            element={ <Finish user={user} origin={origin} destination={destination} stops={stops}/> }
          />
        </Routes>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
