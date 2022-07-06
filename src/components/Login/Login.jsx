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
          name: name,
          password: password,
        },
      })
      .then((response) => {
        if (response.data == "Found") {
          alert("User already in the system. Please login");
        }
      });
  };

  let navigate = useNavigate();
  async function handleCheckUser(name, password) {
    let data = await axios.get(`http://localhost:3001/users`);
    let userExist = data.data.users.users.find(
      (actualUser) => actualUser.name == name && actualUser.password == password
    );
    if (userExist != undefined) {
      navigate("../route");
    } else {
      alert("User not in the system. Please create an account");
    }
  }

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
          <button onClick={(event) => handleCheckUser(name, password)}>
            Login
          </button>
          <button onClick={handleCreateUser}>Create Account</button>
        </div>
      </div>
    </>
  );
}
