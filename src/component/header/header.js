import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
export default function Header() {
  const [activate, setActivate] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActivate("home");
    } else if (location.pathname === "/about") {
      setActivate("about");
    } else if (location.pathname === "/add") {
      setActivate("add");
    }
  }, [location]);
  return (
    <div className="header">
      <div className="headerWrapper">
        <p className="logo">contact</p>
        <div className="headerRight">
          <Link to="/" style={{ textDecoration: "none" }}>
            <p
              className={activate === "home" ? "activate" : ""}
              onMouseDown={() => {
                setActivate("home");
              }}
            >
              Home
            </p>
          </Link>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <p
              className={activate === "about" ? "activate" : ""}
              onMouseDown={() => {
                setActivate("about");
              }}
            >
              About
            </p>
          </Link>
          <Link to="/add" style={{ textDecoration: "none" }}>
            <p
              className={activate === "add" ? "activate" : ""}
              onMouseDown={() => {
                setActivate("add");
              }}
            >
              Add a contact
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
