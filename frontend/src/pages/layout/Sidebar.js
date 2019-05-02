import React from "react";
import { Link, withRouter } from "react-router-dom";
import classNames from "classnames";

import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

function Sidebar({ location, auth, logoutUser }) {
  const { pathname } = location;
  const { papel } = auth.user;

  return (
    <div>
      <div className="is-hidden-touch" style={{ marginLeft: 170 + "px" }} />
      <div
        className="dashboard-panel is-hidden-touch is-small has-background-black"
        style={{ position: "fixed" }}
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
            {papel === "professor" ? (
              <li>
                <Link
                  className={classNames("has-text-grey-lighter", {
                    "is-active": pathname === "/dashboard/disciplina"
                  })}
                  to="/dashboard/disciplina"
                >
                  Disciplina
                </Link>
              </li>
            ) : null}
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
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  logoutUser();
                }}
                className="has-text-grey-lighter"
              >
                Sair
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Sidebar)
);
