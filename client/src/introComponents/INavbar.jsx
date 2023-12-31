import React from "react";
import "../css/iNavbar.css";
import { Link, NavLink } from "react-router-dom";

export default function INavbar() {
  const linkStyle = {
    textDecoration: "none",
    color: "rgba(0,0,0)",
   
  };

  const joinStyle = { textDecoration: "none", color: "#ff2300",fontSize: "1.1rem",fontWeight: 'bold'};
  return (
    <div className="Navbar">
      <div className="item">
        <div className="home" id="dItem">
          <Link to="/Home" style={linkStyle}>
            Home
          </Link>
        </div>
        <div className="benefit" id="dItem">
          <Link to="/Benefit" style={linkStyle}>
            Benefit
          </Link>
        </div>
        <div className="about" id="dItem">
          <Link to="/About" style={linkStyle}>
            About
          </Link>
        </div>
        <div className="contact us" id="dItem">
          <Link to="/Contact" style={linkStyle}>
            Contact Us
          </Link>
        </div>
      </div>
      <div className="login">
        <div className="login_div">
          <Link to="/JoinUs" style={joinStyle}>
            Join us
          </Link>
        </div>
      </div>
    </div>
  );
}
