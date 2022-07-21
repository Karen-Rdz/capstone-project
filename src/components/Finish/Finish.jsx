import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./Finish.css";
import emailjs from "@emailjs/browser";

export default function Finish({ user, origin, destination, stops }) {
  const [emailActivated, setEmailActivated] = React.useState(false);
  const [email, setEmail] = React.useState("");
  let stopsString = "";

  stops.forEach((stop, index) => {
    stopsString =
      stopsString +
      `Stop #${index + 1}
      Name: ${stop.name} 
      Address: ${stop.address} 
      Lat: ${stop.lat} Lng: ${stop.lng}` +
      "\n ";
  });
  console.log(stopsString);

  const params = {
    user_email: email,
    user_name: user.username,
    origin: origin.name,
    destination: destination.name,
    stops: stopsString,
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send("service_wz1r8uj", "template_6hbmmfd", params, "UQE4Uo9sEsSXJPmfs")
      .then(
        (result) => {
          alert("Email sent successfully");
        },
        (error) => {
          alert("Error sending email");
          console.log(error.text);
        }
      );
  };
  let navigate = useNavigate();
  function toPages(page) {
    navigate(`../${page}`);
  }
  return (
    <>
      <div className="finish">
        <h1>Thank you!</h1>
        <p>
          Do you want to receive an email with your travel information?
          <input type="radio" onClick={() => setEmailActivated(true)} /> Yes
        </p>
        {emailActivated ? (
          <>
            <input
              className="emailInput"
              type="text"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="sendEmail" onClick={sendEmail}>
              Send Email
            </button>
          </>
        ) : (
          <p></p>
        )}

        <p>
          If you want to check all your saved trips. Click on the button below
        </p>
        <button className="allTripsButton" onClick={() => toPages("trips")}>
          All Trips
        </button>
        <p>If you want to create another trip. Click on the button below</p>
        <button className="createTripButton" onClick={() => toPages("route")}>
          Create Trip
        </button>
        <p>If you want to return to home. Click on the button below</p>
        <button className="createTripButton" onClick={() => toPages("")}>
          Home Page
        </button>
      </div>
    </>
  );
}
