import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const Appbar = (props) => {
  const {username}=useParams();
  console.log(username);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data); 
          setEmail(data.username); 
        });
      } else {
        console.error('Error fetching data:', res.statusText);
      }
    }).catch((error) => {
      console.error('Fetch error:', error);
    });
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Udemy</Typography>
        <div
          style={{
            padding: 10,
          }}
        >
          <Link to="/">
            <Button variant="outlined" style={{ marginRight: 10 }}>
              Home
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="outlined" style={{ marginRight: 10 }}>
              All Courses
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outlined" style={{ marginRight: 10 }}>
              Sign in
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outlined">SignUp</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Appbar;