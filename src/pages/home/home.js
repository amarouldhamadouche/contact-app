import React, { useState, useEffect } from "react";
import Header from "../../component/header/header";
import fire from "../../firebase";
import { Link } from "react-router-dom";
import { child } from "firebase/database";
import { onValue, remove } from "firebase/database";
import "./home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [data, setData] = useState({});
  useEffect(() => {
    onValue(child(fire, "contacts"), (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  }, []);
  toast.configure();
  const onDelete = (id) => {
    if (window.confirm("do u really wanna delet this contact")) {
      remove(child(fire, `contacts/${id}`))
        .then(toast.success("contact deleted successfuly"))
        .catch((err) => toast.error(err));
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: "100px",
          padding: "10px",
        }}
      >
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>no</th>
              <th style={{ textAlign: "center" }}>name</th>
              <th style={{ textAlign: "center" }}>email</th>
              <th style={{ textAlign: "center" }}>phone</th>
              <th style={{ textAlign: "center" }}>action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row"> {index + 1} </th>
                  <td> {data[id].name} </td>

                  <td> {data[id].email} </td>
                  <td> {data[id].phoneNumber} </td>
                  <td>
                    <Link
                      to={`/update/${id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button className="btn btn-edit">edit</button>
                    </Link>
                    <button
                      className="btn btn-delet"
                      onClick={() => {
                        onDelete(id);
                      }}
                    >
                      delet
                    </button>

                    <Link to={`/view/${id}`} style={{ textDecoration: "none" }}>
                      <button className="btn btn-view">view</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
