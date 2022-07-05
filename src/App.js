import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Finish from "./components/Finish/Finish";
import Header from "./components/Header/Header";
import Login from './components/Login/Login';
import NumberStops from "./components/NumberStops/NumberStops";
import Planner from "./components/Planner/Planner";

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
            path="/trip"
            element={ <NumberStops /> }
          />
          <Route
            path="/stops"
            element={ <Planner /> }
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
