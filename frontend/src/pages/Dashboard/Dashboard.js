import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Games from "../../components/Games/Games";

export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-panel is-medium has-thick-padding is-hidden-mobile">
          <aside className="menu has-text-white">
            <p className="menu-label">Geral</p>
            <ul className="menu-list">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/games">Games</Link>
              </li>
            </ul>
            <p className="menu-label">Administração</p>
            <ul className="menu-list">
              <li>
                <a>Team Settings</a>
              </li>
              <li>
                <a className="is-active">Manage Your Team</a>
                <ul>
                  <li>
                    <a>Members</a>
                  </li>
                  <li>
                    <a>Plugins</a>
                  </li>
                  <li>
                    <a>Add a member</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Invitations</a>
              </li>
              <li>
                <a>Cloud Storage Environment Settings</a>
              </li>
              <li>
                <a>Authentication</a>
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

export default Dashboard;
