import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Button,
  makeStyles,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loginRestPage: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem 0",
  },
  input: {
    marginBottom: theme.spacing(3),
    width: "90%",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginClicked, setLoginClicked] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/auth/login", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.loggedin) {
          setLoginClicked(false);
          setSnackOpen(true);
          setMsg("Already Logged In");
          // props.history.push("/");
          window.location.replace("/");
        }
      });
  }, [props]);

  const signIn = (e) => {
    e.preventDefault();
    setLoginClicked(true);
    fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoginClicked(false);
        setSnackOpen(true);
        if (data.loggedin) {
          setMsg("Logged in Successfully");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else setMsg("Invalid Credentials");
        setTimeout(() => setSnackOpen(false), 1000);
      })
      .catch((error) => {
        setMsg("Something went wrong");
        setTimeout(() => setSnackOpen(false), 1000);
        setLoginClicked(false);
      });
  };

  return (
    <>
      <div className={`Login restpage ${classes.loginRestPage}`}>
        <Paper
          style={{
            maxWidth: "350px",
            margin: "0 auto",
            padding: "1rem",
            textAlign: "center",
            height: "100%",
          }}
        >
          <form onSubmit={signIn} noValidate autoComplete="off">
            <h2>Login</h2>
            <TextField
              type="email"
              className={classes.input}
              size="small"
              variant="outlined"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              className={classes.input}
              size="small"
              variant="outlined"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              style={{ marginBottom: "2rem" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              {loginClicked ? (
                <CircularProgress size={25} color="#fff" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Paper>
      </div>
      {/* snack bar */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackOpen}
        message={msg}
        autoHideDuration={6000}
      />
    </>
  );
}
export default Login;
