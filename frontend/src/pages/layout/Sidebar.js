import React from "react";
import { Link, withRouter } from "react-router-dom";
import classNames from "classnames";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

function Sidebar({ location, auth }) {
  const { pathname } = location;
  const { papel } = auth.user;

  return (
    <div>
      <aside className="is-hidden-touch">
        <nav
          className="menu p-1"
          style={{
            backgroundColor: "#181818"
          }}
        >
          <p className="menu-label has-text-grey-lighter">Geral</p>
          <ul className="menu-list">
            <li>
              <Link
                className={classNames("has-text-grey-lighter", {
                  "is-active": pathname === "/painel"
                })}
                to="/painel"
              >
                Painel
              </Link>
            </li>
            {papel === "professor" ? (
              <li>
                <Link
                  className={classNames("has-text-grey-lighter", {
                    "is-active": pathname === "/disciplina"
                  })}
                  to="/disciplina"
                >
                  Disciplina
                </Link>
                <ul>
                  <li>
                    <Link
                      className={classNames("has-text-grey-lighter", {
                        "is-active": pathname === "/disciplina/criar"
                      })}
                      to="/disciplina/criar"
                    >
                      Criar
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={classNames("has-text-grey-lighter", {
                        "is-active": pathname === "/disciplina/vincular"
                      })}
                      to="/disciplina/vincular"
                    >
                      Vincular
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={classNames("has-text-grey-lighter", {
                        "is-active": pathname === "/disciplina/desvincular"
                      })}
                      to="/disciplina/desvincular"
                    >
                      Desvincular
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null}
            <li>
              <Link
                className={classNames("has-text-grey-lighter", {
                  "is-active": pathname === "/games"
                })}
                to="/games"
              >
                Games
              </Link>
              <ul>
                {papel === "professor" ? (
                  <li>
                    <Link
                      className={classNames("has-text-grey-lighter", {
                        "is-active": pathname === "/games/criar"
                      })}
                      to="/games/criar"
                    >
                      Criar
                    </Link>
                  </li>
                ) : null}
              </ul>
            </li>
          </ul>
          <p className="menu-label has-text-grey-lighter">Configurações</p>
          <ul className="menu-list">
            <li>
              <Link
                className={classNames("has-text-grey-lighter", {
                  "is-active": pathname === "/perfil"
                })}
                to="/perfil"
              >
                Perfil
              </Link>
              <ul>
                <li>
                  <Link
                    className={classNames("has-text-grey-lighter", {
                      "is-active": pathname === "/perfil/editar"
                    })}
                    to="/perfil/editar"
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
        </nav>
      </aside>
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
