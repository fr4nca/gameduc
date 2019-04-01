import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            GAMEDUC
          </a>
          <a
            href="#!"
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

        <div id="navbar_menu" className="navbar-menu">
          {/* 
            TODO: Display different menu options if logged-in
          */}

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* TODO: Display logout button if logged-in */}
                <Link to="/register" className="button is-primary">
                  <strong>Registrar</strong>
                </Link>
                <Link to="/login" className="button is-light">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
