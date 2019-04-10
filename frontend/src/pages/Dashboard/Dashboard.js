import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "../../components/common/PrivateRoute";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Perfil from "../../components/Perfil/Perfil";

import Disciplinas from "../Disciplinas/Disciplinas";
import Games from "../Games/Games";
import Sidebar from "../layout/Sidebar";
import Game from "../Games/Game";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-main is-scrollable">
          <section className="section">
            <Switch>
              <PrivateRoute
                allowed={["professor"]}
                exact
                path="/dashboard/disciplina"
                component={Disciplinas}
              />
              <Route exact path="/dashboard/games" component={Games} />
              <Route exact path="/dashboard/perfil" component={Perfil} />
              <Route exact path="/dashboard/game/:id" component={Game} />
            </Switch>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Dashboard)
);
