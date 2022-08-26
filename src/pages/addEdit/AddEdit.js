import React, { useState, useEffect } from "react";
import Header from "../../component/header/header";
import "./addEdit.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fire from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { child, push, onValue, set } from "firebase/database";

const initialState = {
  name: "",
  email: "",
  phoneNumber: "",
};
export default function AddEdit() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { email, name, phoneNumber } = state;
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    onValue(child(fire, "contacts"), (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  }, [id]);
  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);
  const inputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  toast.configure();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber) {
      toast.error("please provide value in each input field");
    } else {
      if (!id) {
        push(child(fire, "contacts"), state)
          .then(toast.success("contact added successfuly"))
          .catch((err) => toast.error(err));
        setTimeout(() => navigate("/"), 500);
      } else {
        set(child(fire, `contacts/${id}`), state)
          .then(toast.success("contact updated successfuly"))
          .catch((err) => toast.error(err));
        setTimeout(() => navigate("/"), 500);
      }
    }
  };

  return (
    <>
      <Header />

      <div className="addEdit" style={{ marginTop: "100px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "35px",
            maxWidth: "400px",
            width: "300px",
            alignContent: "center",
            borderRadius: "10px",
          }}
        >
          <label htmlFor="name">name : </label>
          <br></br>
          <input
            className="input"
            name="name"
            type="text"
            value={name || ""}
            onChange={inputChange}
          />
          <br></br>
          <label htmlFor="email">email : </label>
          <br></br>
          <input
            className="input"
            name="email"
            type="email"
            value={email || ""}
            onChange={inputChange}
          />
          <br></br>
          <label htmlFor="phone number">num : </label>
          <br></br>
          <input
            className="input"
            name="phoneNumber"
            type="number"
            value={phoneNumber || ""}
            onChange={inputChange}
          />
          <br></br>
          <button className="addButton" type="submit">
            {!id ? "save" : "update"}
          </button>
        </form>
      </div>
    </>
  );
}
