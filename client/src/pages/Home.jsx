import React, { useEffect, useState } from "react";
import "../App.css";
import logo from "../assets/home.png";
import HiveIcon from "@mui/icons-material/Hive";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const roomID = uuid();

export default function Home(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("user");
    setUser(userName);
  }, []); // Adding an empty dependency array ensures this effect runs only once on mount

  return (
    <div className="home">
      {user ? (
        <>
          <h1>Hello, {user}!</h1>
          <Button
            onClick={() => {
              navigate("/room/" + roomID);
            }}
            variant="contained"
            startIcon={<HiveIcon />}
            sx={{
              mt: 1,
              outline: "none",
              textDecoration: "none",
              textTransform: "none",
              color: "white",
              backgroundColor: "#6a35f6",
              fontSize: 20,
              borderRadius: 2,
              padding: "10px 20px",
            }}
          >
            Creae Your New Hive
          </Button>
          <br />
          <h2>OR</h2>
          <input
            type="text"
            value={id}
            placeholder="Enter HiveId"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <br />
          <Button
            onClick={() => {
              navigate("/room/" + id);
            }}
            variant="contained"
            sx={{
              mt: 1,
              outline: "none",
              textDecoration: "none",
              textTransform: "none",
              color: "white",
              backgroundColor: "#6a35f6",
              fontSize: 20,
              borderRadius: 5,
            }}
          >
            Join Hive
          </Button>
        </>
      ) : (
        <>
          <img src={logo} alt="logo" />
          <h3>Enter your name</h3>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <Button
            onClick={() => {
              localStorage.setItem("user", name);
              setUser(name);
            }}
            variant="contained"
            sx={{
              mt: 1,
              outline: "none",
              textDecoration: "none",
              textTransform: "none",
              color: "white",
              backgroundColor: "#6a35f6",
              fontSize: 20,
              borderRadius: 5,
            }}
          >
            Let's Go!
          </Button>
        </>
      )}
    </div>
  );
}
