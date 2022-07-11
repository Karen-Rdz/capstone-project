import * as React from "react";
import "./Header.css";
import logo from "./logo.png";

export default function Header() {
  return (
    <>
      <div className="header">
        {/* <h1>Logo</h1> */}
        <img className="logo-img" src={logo} alt="logo" />
      </div>
    </>
  );
}
