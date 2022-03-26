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

import { dev, prod } from "../APIEndpoints";
import CircularProgress from "@mui/material/CircularProgress";

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
export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
      username: data.get("username")
    };

    let signUpURL = "";
    if (process.env.NODE_ENV === "development") {
      signUpURL = `${dev.baseURL}${dev.register}`;
    } else if (process.env.NODE_ENV === "production") {
      signUpURL = `${prod.baseURL}${prod.register}`;
    }

    fetch(signUpURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(
        (json) => {
          localStorage.setItem("token", json.token);
          if (json.email) {
            setIsLoading(false);
            navigate("/login", { replace: true });
          }
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={3} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Register User
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="LastName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              {isLoading && <CircularProgress />}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Submit
              </Button>
              {error && <h6>{error}</h6>}

              {/* <h6>Loading . . .</h6> */}
              {/* {{isLoading}} */}

              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
