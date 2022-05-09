import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import Home from "./templates/Home";
import Login from "./templates/auth/Login";
import Bucket from "./templates/bucket/Bucket";
import Creds from "./templates/credentials/Creds";
import Docs from "./templates/docs/Docs";
import Notes from "./templates/notebook/Notes";
import Header from "./components/Header";
import SMS from "./templates/SMS";
import SignUp from "./templates/auth/SignUp";

const Theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App(props) {
  return (
    <MuiThemeProvider theme={Theme}>
      <div className="App">
        <Router>
          <Header />
          <Route component={Home} exact path="/" />
          <Route component={Login} path="/login" />
          <Route component={SignUp} exact path="/register" />
          <Route component={Bucket} exact path="/bucket" />
          <Route component={Docs} exact path="/docs" />
          <Route component={Notes} exact path="/notes" />
          <Route component={Creds} exact path="/credentials" />
          <Route component={SMS} exact path="/sms" />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
