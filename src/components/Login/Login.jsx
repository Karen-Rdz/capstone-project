import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCreateUser = () => {
    axios.post("http://localhost:3001/user", {
      user: {
        name: name,
        password: password,
      },
    });
  };

  return (
    <>
      <div className="login">
        <h1>Trip Planner</h1>
        <h2>Welcome!</h2>
        <div className="input-texts">
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="buttons">
          <button>
            <Link to={`/route`}>Login</Link>
          </button>
          <button onClick={handleCreateUser}>Create Account</button>
        </div>
      </div>
    </>
  );
}
