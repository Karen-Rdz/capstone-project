import * as React from "react";
import "./Header.css";
import logo from "./logo2.PNG";

export default function Header() {
  return (
    <>
      <div className="header">
        <img className="logo-img" src={logo} alt="logo" />
      </div>
    </>
  );
}
