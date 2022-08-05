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
      "\r ";
  });

  const params = {
    user_email: email,
    user_name: user.username,
    origin: origin.name,
    destination: destination.name,
    stops: stopsString + "\r ",
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
        <h1>Your road trip plan is complete!</h1>
        <progress className="progress" value="100" max="100"></progress>
        <div className="email">
          <p>
            Do you want to receive an email with your trip information?
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
        </div>
        <div className="finishAccions">
          <div className="allTrips">
            <p>See all saved trips</p>
            <button className="allTripsButton" onClick={() => toPages("trips")}>
              All Trips
            </button>
          </div>
          <div className="createTrip">
            <p>Create another trip</p>
            <button
              className="createTripButton"
              onClick={() => toPages("route")}
            >
              Create Trip
            </button>
          </div>
          <div className="homePage">
            {" "}
            <p>Return to home page</p>
            <button className="createTripButton" onClick={() => toPages("")}>
              Home Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
