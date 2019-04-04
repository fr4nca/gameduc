import React, { Component } from "react";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import classNames from "classnames";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Games from "../../components/Games/Games";
import Painel from "../../components/Painel/Painel";
import Perfil from "../../components/Perfil/Perfil";
import EditarPerfil from "../../components/Perfil/EditarPerfil";

class Dashboard extends Component {
  render() {
    const { pathname } = this.props.location;

    return (
      <div className="dashboard">
        <div
          className="dashboard-panel has-background-black is-small has-thick-padding is-hidden-touch"
          style={{ height: 100 + "vh" }}
        >
          <aside className="menu">
            <p className="menu-label has-text-grey-lighter">Geral</p>
            <ul className="menu-list">
              <li>
                <Link
                  className={classNames("has-text-grey-lighter", {
                    "is-active": pathname === "/dashboard"
                  })}
                  to="/dashboard"
                >
                  Painel
                </Link>
              </li>
              <li>
                <Link
                  className={classNames("has-text-grey-lighter", {
                    "is-active": pathname === "/dashboard/games"
                  })}
                  to="/dashboard/games"
                >
                  Games
                </Link>
              </li>
            </ul>
            <p className="menu-label has-text-grey-lighter">Configurações</p>
            <ul className="menu-list">
              <li>
                <Link
                  className={classNames("has-text-grey-lighter", {
                    "is-active": pathname === "/dashboard/perfil"
                  })}
                  to="/dashboard/perfil"
                >
                  Perfil
                </Link>
                <ul>
                  <li>
                    <Link
                      className={classNames("has-text-grey-lighter", {
                        "is-active": pathname === "/dashboard/perfil/editar"
                      })}
                      to="/dashboard/perfil/editar"
                    >
                      Editar
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => {
                    this.props.logoutUser();
                  }}
                  className="has-text-grey-lighter"
                >
                  Sair
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <div className="dashboard-main is-scrollable">
          <section className="section">
            <Switch>
              <Route exact path="/dashboard" component={Painel} />
              <Route exact path="/dashboard/games" component={Games} />
              <Route exact path="/dashboard/perfil" component={Perfil} />
              <Route
                exact
                path="/dashboard/perfil/editar"
                component={EditarPerfil}
              />
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
