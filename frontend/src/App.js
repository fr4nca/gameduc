import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";
import {
  setCurrentUser,
  logoutUser,
  setCurrentProfile
} from "./actions/authActions";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./pages/layout/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";

if (localStorage.getItem("@Gameduc:userToken")) {
  setAuthToken(localStorage.getItem("@Gameduc:userToken"));

  const decoded = jwt_decode(localStorage.getItem("@Gameduc:userToken"));

  store.dispatch(setCurrentUser(decoded));
  store.dispatch(setCurrentProfile());

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute
              allowed={["professor", "aluno"]}
              exact
              path="/dashboard"
              component={Dashboard}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
