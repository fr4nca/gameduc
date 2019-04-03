import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import classNames from "classnames";

import Games from "../../components/Games/Games";

class Dashboard extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="dashboard">
        <div className="dashboard-panel is-medium has-thick-padding is-hidden-mobile">
          <aside className="menu has-text-white">
            <p className="menu-label">Geral</p>
            <ul className="menu-list">
              <li>
                <Link
                  className={classNames({
                    "is-active": pathname === "/dashboard"
                  })}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className={classNames({
                    "is-active": pathname === "/dashboard/games"
                  })}
                  to="/dashboard/games"
                >
                  Games
                </Link>
              </li>
            </ul>
            <p className="menu-label">Configurações</p>
            <ul className="menu-list">
              <li>
                <a>Perfil</a>
                <ul>
                  <li>
                    <a>Editar</a>
                  </li>
                  <li>
                    <a>Remover</a>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
        </div>

        <div className="dashboard-main is-scrollable">
          <section className="section">
            <Route path="/dashboard/games" component={Games} />
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
