import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
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
        }
      });
  };

  let navigate = useNavigate();
  async function handleLogin() {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        user: {
          username: name,
          password: password,
        },
      });
      navigate("../route");
    } catch (err) {
      alert("User not in the system. Please create an account");
      console.log(err);
    }
  }
  return (
    <>
      <div className="login">
        <div className="welcome">
          <h1>Welcome!</h1>
        </div>
        <div className="user">
          <div className="input-texts">
            <h2>Your Account</h2>
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
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleCreateUser}>Create Account</button>
          </div>
        </div>
      </div>
    </>
  );
}
