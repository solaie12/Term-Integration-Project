import React, { Component } from "react";
import SignInSide from "../auth/SinginSide";
import MenuAppBar from "./NavBar";
import Welcome from "./Welcome";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { dev, prod } from "../APIEndpoints";

export const Dashboard = (props) => {
  let userInfoURL = "";
  if (process.env.NODE_ENV === "development") {
    userInfoURL = `${dev.baseURL}${dev.userInfo}`;
  } else if (process.env.NODE_ENV === "production") {
    userInfoURL = `${prod.baseURL}${prod.userInfo}`;
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(userInfoURL, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.email) {
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Welcome></Welcome>;
  } else if (isLoggedIn) {
    return <MenuAppBar></MenuAppBar>;
  } else if (!isLoading || !isLoggedIn) {
    navigate("/login", { replace: true });
    return <h1></h1>;
  }
};
