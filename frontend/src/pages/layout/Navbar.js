import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import classNames from "classnames";

import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

function Navbar({ auth, logoutUser, location: { pathname } }) {
  const {
    isAuthenticated,
    user: { papel }
  } = auth;
  const [open, toggleOpen] = useState(false);

  return (
    <nav
      className="navbar is-black"
      role="navigation"
      aria-label="main navigation"
      style={{ position: "sticky", top: 0, left: 0 }}
    >
      <div className="navbar-brand">
        <Link
          className="navbar-item"
          to="/dashboard"
          onClick={() => toggleOpen(false)}
        >
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
          "is-active": open
        })}
      >
        <div className="navbar-start">
          <Link
            to="/"
            onClick={() => toggleOpen(false)}
            className="navbar-item"
          >
            Home
          </Link>
        </div>

        <hr />

        <div className="navbar-end">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => toggleOpen(false)}
                className={classNames("navbar-item is-tab", {
                  "is-active": pathname === "/dashboard",
                  "is-hidden-desktop":
                    pathname !== "/" &&
                    pathname !== "/register" &&
                    pathname !== "/login"
                })}
              >
                Painel
              </Link>
              <Link
                to="/dashboard/games"
                onClick={() => toggleOpen(false)}
                className={classNames("navbar-item is-tab is-hidden-desktop", {
                  "is-active": pathname === "/dashboard/games",
                  "is-hidden-desktop":
                    pathname !== "/" &&
                    pathname !== "/register" &&
                    pathname !== "/login"
                })}
              >
                Games
              </Link>
              {papel === "professor" ? (
                <Link
                  to="/dashboard/disciplina"
                  onClick={() => toggleOpen(false)}
                  className={classNames(
                    "navbar-item is-tab is-hidden-desktop",
                    {
                      "is-active": pathname === "/dashboard/disciplina",
                      "is-hidden-desktop":
                        pathname !== "/" &&
                        pathname !== "/register" &&
                        pathname !== "/login"
                    }
                  )}
                >
                  Disciplina
                </Link>
              ) : null}
              <Link
                to="/dashboard/perfil"
                onClick={() => toggleOpen(false)}
                className={classNames("navbar-item is-tab is-hidden-desktop", {
                  "is-active": pathname === "/dashboard/perfil",
                  "is-hidden-desktop":
                    pathname !== "/" &&
                    pathname !== "/register" &&
                    pathname !== "/login"
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
                className={classNames("navbar-item is-tab", {
                  "is-hidden-desktop":
                    pathname !== "/" &&
                    pathname !== "/register" &&
                    pathname !== "/login"
                })}
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
