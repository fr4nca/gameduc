import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";

import React, { Component } from "react";
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

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./pages/layout/Navbar";
import PrivateRoute from "./components/common/PrivateRoute";
import Sidebar from "./pages/layout/Sidebar";
import Disciplinas from "./pages/Disciplinas/Disciplinas";
import CriarDisciplina from "./components/Disciplina/CriarDisciplina";
import VincularDisciplina from "./components/Disciplina/VincularDisciplina";
import Games from "./pages/Games/Games";
import CriarGame from "./components/Game/CriarGame";
import Perfil from "./components/Perfil/Perfil";
import EditarPerfil from "./components/Perfil/EditarPerfil";
import Painel from "./pages/Painel/Painel";
import Landing from "./pages/Landing/Landing";

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
          <div className="columns">
            <div className="column is-2">
              <Sidebar />
            </div>
            <div className="column is-10 py-3">
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/painel" component={Painel} />
                <Route exact path="/" component={Landing} />
                <PrivateRoute
                  allowed={["professor"]}
                  exact
                  path="/disciplina"
                  component={Disciplinas}
                />
                <PrivateRoute
                  allowed={["professor"]}
                  exact
                  path="/disciplina/criar"
                  component={CriarDisciplina}
                />
                <PrivateRoute
                  allowed={["professor"]}
                  exact
                  path="/disciplina/vincular"
                  component={VincularDisciplina}
                />
                <Route exact path="/games" component={Games} />
                <PrivateRoute
                  allowed={["professor"]}
                  exact
                  path="/games/criar"
                  component={CriarGame}
                />
                <Route exact path="/perfil" component={Perfil} />
                <Route exact path="/perfil/editar" component={EditarPerfil} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
