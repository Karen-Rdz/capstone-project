import * as React from "react";
import { Link } from "react-router-dom";
import "./Finish.css";
import emailjs from "@emailjs/browser";

export default function Finish({ user, origin, destination, stops }) {
  const [email, setEmail] = React.useState("");
  let stopsString = ``;

  stops.map((stop, index) => {
    stopsString =
      stopsString +
      `Stop #${index + 1} \n\r Name: ${stop.name} Address: ${
        stop.address
      } Lat: ${stop.lat} Lng: ${stop.lng} \n\r`;
  });

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
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <div className="finish">
        <h1>Thank you!</h1>
        <p>
          If you want to check all your saved trips. Click on the button below
        </p>
        <button>
          <Link to={`/trips`}>All Trips</Link>
        </button>
        <p>If you want to create another trip. Click on the button below</p>
        <button>
          <Link to={`/route`}>Create Trip</Link>
        </button>
        <p>
          If you want to email your trip. Write your email and click on the
          button below
        </p>
        <input
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button onClick={sendEmail}>Send Email</button>
      </div>
    </>
  );
}
