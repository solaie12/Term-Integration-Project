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
import { dev, prod } from "../APIEndpoints";
import background1 from "../../static/background1.jpg";

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
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      username: data.get("username"),
      password: data.get("password")
    };

    let signInURL = "";
    if (process.env.NODE_ENV === "development") {
      signInURL = `${dev.baseURL}${dev.login}`;
    } else if (process.env.NODE_ENV === "production") {
      signInURL = `${prod.baseURL}${prod.login}`;
    }

    fetch(signInURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())

      .then((json) => {
        if (json.access) {
          setIsLoading(false);

          localStorage.setItem("token", json.access);
          navigate("/dashboard", { replace: true });
        } else {
          setLoginFailed(true);
          setIsLoading(false);
        }
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background1})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "right"
          }}
        />
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
                id="username"
                label="Email Address"
                name="username"
                autoComplete="username"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {isLoading && <CircularProgress />}

              {loginFailed && (
                <Alert severity="error">
                  Login Failed.Please check your username and password and try
                  again.
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"></Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot password?
                    {/* {"Don't have an account? Sign Up"} */}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
