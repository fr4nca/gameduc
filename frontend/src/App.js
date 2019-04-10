import "bulma/css/bulma.css";
import "bulma-dashboard/dist/bulma-dashboard.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import {
  setCurrentUser,
  logoutUser,
  setCurrentProfile
} from "./actions/authActions";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import Navbar from "./pages/layout/Navbar";
import Footer from "./pages/layout/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

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

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute
          allowed={["professor", "aluno"]}
          path="/dashboard"
          component={Dashboard}
        />
      </Switch>
      <Footer />
    </Router>
  </Provider>
);

export default App;
