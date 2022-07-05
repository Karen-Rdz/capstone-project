import * as React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  return (
    <>
      <div className="login">
        <h1>Trip Planner</h1>
        <h2>Welcome!</h2>
        <div className="input-texts">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        </div>
        <div className="buttons">
          <button>
            <Link to={`/trip`}>Login</Link>
          </button>
          <button>Create Account</button>
        </div>
      </div>
    </>
  );
}
