import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { Icon } from "@iconify/react";
import road from "./road.jpg";
import road2 from "./road2.jpg";
import logo from "./logo_crop.png";

export default function Login({ setUser }) {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCreateUser = () => {
    axios
      .post("http://localhost:3001/user", {
        user: {
          username: name,
          password: password,
        },
      })
      .then((response) => {
        if (response.data === "error") {
          alert("User already in the system. Please login");
        } else {
          alert("User created successfully. Please login");
        }
      });
  };

  let navigate = useNavigate();
  async function handleLogin() {
    try {
      await axios.post("http://localhost:3001/login", {
        user: {
          username: name,
          password: password,
        },
      });
      await axios.post("http://localhost:3001/session", {
        user: {
          username: name,
          password: password,
        },
      });
      setUser({
        username: name,
        password: password,
      });
      navigate(`../route`);
    } catch (err) {
      alert("User not in the system. Please create an account");
    }
  }
  return (
    <>
      <div className="login">
        <div className="welcome">
          <img className="logo-crop" src={logo} alt="logo" />
          <img className="road2" src={road2} alt="road2" />
        </div>
        <div className="user">
          <div className="input-texts">
            <h2>Your Account</h2>
            <input
              className="loginInput"
              type="text"
              placeholder="Username"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="loginInput"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="buttons">
            <button className="loginButton" onClick={handleLogin}>
              Login
            </button>
            <button className="loginButton" onClick={handleCreateUser}>
              Create Account
            </button>
          </div>
        </div>
      </div>
      <div className="titleInstruccions">
        <h2> How it works?</h2>
      </div>
      <div className="instruccions">
        <div className="step1">
          <h3>Step 1</h3>
          <p>Create your trip</p>
          <Icon className="routeIcon" icon="fa-solid:route" />
        </div>
        <Icon className="arrowIcon" icon="akar-icons:arrow-right" />
        <div className="step2">
          <h3>Step 2</h3>
          <p>Add your stops</p>
          <Icon className="stopIcon" icon="fontisto:map-marker-alt" />
        </div>
        <Icon className="arrowIcon" icon="akar-icons:arrow-right" />
        <div className="step3">
          <h3>Step 3</h3>
          <p>Save your trip</p>
          <Icon className="saveIcon" icon="bx:save" />
        </div>
      </div>
      <div className="titleInformation">
        <h2>What is Road Trip Planner?</h2>
      </div>
      <div className="information">
        <p className="about">
          It is a web app that will help you plan the necessary stops on your
          road trip. When creating a trip, we recommend the number of stops
          needed depending on the distance, time you decide to be driving or
          fuel consumption depending on your car. With this in mind, an
          interactive map will appear where you can visualize your route, where
          you need to stop, and add different establishments such as gas
          stations or restaurants, which will help you add stops at the places
          you choose. At the end, you can save your route for future reference
          and send it via email.
        </p>
        <img className="road-img" src={road} alt="road" />
      </div>
      <div className="contact">
        <p></p>
        <p>
          {" "}
          <b>Address:</b> 1 Hacker Way, Menlo Park, CA, USA
        </p>
        <p>
          {" "}
          <b>Email: </b>karenrdz@fb.com
        </p>
        <p>
          {" "}
          <b>Phone number: </b>+1 (650) 519-5858
        </p>
        <p></p>
      </div>
    </>
  );
}
