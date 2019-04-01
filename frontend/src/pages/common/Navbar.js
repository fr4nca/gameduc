import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

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
                  {isAuthenticated ? (
                    <Link
                      to="/login"
                      onClick={this.props.logoutUser}
                      className="button"
                    >
                      Log out
                    </Link>
                  ) : (
                    <>
                      <Link to="/register" className="button is-primary">
                        <strong>Registrar</strong>
                      </Link>
                      <Link to="/login" className="button is-light">
                        Log in
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
