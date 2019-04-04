import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import classNames from "classnames";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

function Navbar({ auth, logoutUser, location: { pathname } }) {
  const { isAuthenticated } = auth;
  const [open, toggleOpen] = useState(false);

  return (
    <nav
      className="navbar is-black"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/" onClick={() => toggleOpen(false)}>
          GAMEDUC
        </Link>
        <a
          href="#!"
          onClick={() => {
            toggleOpen(!open);
          }}
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar_menu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbar_menu"
        className={classNames("navbar-menu", {
          "is-active": open,
          "is-hidden-desktop":
            pathname !== "/" &&
            pathname !== "/register" &&
            pathname !== "/login"
        })}
      >
        <div className="navbar-end">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => toggleOpen(false)}
                className={classNames({
                  "navbar-item": true,
                  "is-tab": true,
                  "is-active": pathname === "/dashboard"
                })}
              >
                Painel
              </Link>
              <Link
                to="/dashboard/games"
                onClick={() => toggleOpen(false)}
                className={classNames("navbar-item is-tab is-hidden-desktop", {
                  "is-active": pathname === "/dashboard/games"
                })}
              >
                Games
              </Link>
              <Link
                to="/dashboard/perfil"
                onClick={() => toggleOpen(false)}
                className={classNames("navbar-item is-tab is-hidden-desktop", {
                  "is-active": pathname === "/dashboard/perfil"
                })}
              >
                Perfil
              </Link>
              <Link
                to="/login"
                onClick={() => {
                  logoutUser();
                  toggleOpen(false);
                }}
                className="navbar-item is-tab"
              >
                Sair
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className={classNames("navbar-item is-tab", {
                  "is-active": pathname === "/register"
                })}
                onClick={() => toggleOpen(false)}
              >
                <span>Registrar</span>
              </Link>
              <Link
                to="/login"
                className={classNames("navbar-item is-tab", {
                  "is-active": pathname === "/login"
                })}
                onClick={() => toggleOpen(false)}
              >
                <span>Entrar</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar)
);
