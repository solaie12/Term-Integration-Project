import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import companyLogo from "../../static/logo-Iberia.png";
import "./welcome.css";
import background5 from "../../static/background5.jpg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D7192D"
    },
    secondary: {
      main: "#e3626f"
    }
  }
});
export default function SignInSide() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage: `url(${background5})`, height: "100vh" }}>
        <img src={companyLogo} className="logo"></img>

        <div className="container">
          <Typography variant="h1" color="white" noWrap component="div">
            Welcome
          </Typography>
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
