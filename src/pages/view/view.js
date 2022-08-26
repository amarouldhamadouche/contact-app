import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import fire from "../../firebase";
import { get, child } from "firebase/database";
import Header from "../../component/header/header";
import "./view.css";
export default function View() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    get(child(fire, `contacts/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setUser({ ...snapshot.val() });
      } else {
        setUser({});
      }
    });
  }, [id]);
  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }}>
        <div className="card">
          <div className="container">
            <div className="cardHeader">
              <p>contact user information</p>
            </div>
            <div className="headerottom">
              <strong>id : </strong>
              <span></span>
              <br />
              <strong>name : </strong>
              <span>{user?.name}</span>
              <br />
              <strong>email : </strong>
              <span> {user?.email} </span>
              <br />
              <strong>phoneNumber : </strong>
              <span> {user?.phoneNumber} </span>
              <br />
            </div>
            <button className="btn btn-edit">go back</button>
          </div>
        </div>
      </div>
    </>
  );
}
