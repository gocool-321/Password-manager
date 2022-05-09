import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import axios from "axios";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

function Header(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [login, setLogin] = useState(true);

  useEffect(() => {
    axios.get("/auth/login").then((res) => {
      setLogin(res.data.loggedin ? true : false);
    });
  }, [props]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Avatar
              src={
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.XhKBzpM-eTfDVKIVg4jUnAHaHa%26pid%3DApi%26h%3D160&f=1"
              }
            />
          </IconButton>
          <Link to="/" className="nav-item">
            <Typography variant="h6" className={classes.title}>
              Password Manager
            </Typography>
          </Link>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="secondary"
            aria-label="icon tabs example"
          >
            <Link to="/credentials" className="nav-item">
              <Tab label="Credentials" />
            </Link>

            <Link to="/notes" className="nav-item">
              <Tab label="Notebook" />
            </Link>

            <Link to="/docs" className="nav-item">
              <Tab label="Docs" />
            </Link>

            <Link to="/bucket" className="nav-item">
              <Tab label="Bucket" />
            </Link>
          </Tabs>

          <header className="App-header">
            <div className="nav-container">
              {login ? (
                <ul className="nav-lists">
                  <li className="nav-link">
                    <span
                      className="nav-item"
                      onClick={async () => {
                        axios.get("/auth/logout").then((res) => {
                          window.location.replace("/login");
                        });
                      }}
                    >
                      <Button>Logout</Button>
                    </span>
                  </li>
                </ul>
              ) : (
                <ul className="nav-lists">
                  <li className="nav-link">
                    <Link to="/login" className="nav-item">
                      <Button>Login</Button>
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/register" className="nav-item">
                      <Button>Signup</Button>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </header>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Header;
