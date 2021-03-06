import * as React from "react";
import axios from "axios";
import "./Fuel.css";

export default function Fuel({ distance, stopsFuel, setStopsFuel }) {
  const [maker, setMaker] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("");
  const [mpg, setMpg] = React.useState(0);
  //   const [totalMiles, setTotalMiles] = React.useState(0);
  //   const [galonsNeeded, setGalonsNeeded] = React.useState(0);
  const [fuelCapacity, setFuelCapacity] = React.useState(0);
  const [fuelInformation, setFuelInformation] = React.useState({
    totalMiles: 0,
    galonsNeeded: 0,
    stops: 0,
  });

  async function getFuel() {
    try {
      const res = await axios.get(
        `https://api.api-ninjas.com/v1/cars?model=${model}&maker=${maker}&year=${year}`,
        {
          headers: {
            "X-Api-Key": "XkKmtJT6fLu6sOwk0sYbiw==eR2WclEvgj8OZfvx",
          },
        }
      );
      if (res.data.length === 0) {
        alert("Car not found");
      } else {
        setMpg(res.data[0].city_mpg);
        let totalMiles = ((distance.value / 1000) * 0.6214).toFixed(2);
        let galonsNeeded = (totalMiles / res.data[0].city_mpg).toFixed(2);
        let stops = Math.round(galonsNeeded / fuelCapacity);
        setFuelInformation({
          totalMiles: totalMiles,
          galonsNeeded: galonsNeeded,
          stops: stops,
        });
        setStopsFuel(stops);
      }
    } catch (err) {
      alert("Error getting car information");
      console.log(err);
    }
  }
  return (
    <>
      <input
        placeholder="Maker"
        onChange={(event) => setMaker(event.target.value)}
      />
      <input
        placeholder="Model"
        onChange={(event) => setModel(event.target.value)}
      />
      <input
        placeholder="Year"
        onChange={(event) => setYear(event.target.value)}
      />
      <input
        placeholder="Fuel capacity"
        onChange={(event) => setFuelCapacity(event.target.value)}
      />
      <button onClick={getFuel}>Submit</button>
      {mpg > 0 ? (
        <>
          <p>MPG: {mpg}</p>
          <p>Total miles: {fuelInformation.totalMiles}</p>
          <p>Gallons nedded: {fuelInformation.galonsNeeded}</p>
          <h4>Number of Stops recommended: {fuelInformation.stops} </h4>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
}
