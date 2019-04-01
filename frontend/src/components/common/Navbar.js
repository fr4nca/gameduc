import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            Gameduc
          </a>

          <a
            href="#!"
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar_menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbar_menu" class="navbar-menu">
          {/* 
            TODO: Display different menu options if logged-in
          */}

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                {/* TODO: Display logout button if logged-in */}
                <Link to="/register" class="button is-primary">
                  <strong>Registrar</strong>
                </Link>
                <Link to="/login" class="button is-light">
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
