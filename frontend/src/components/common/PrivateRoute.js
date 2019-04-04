import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import checkRole from "../../utils/checkUserRole";

const PrivateRoute = ({ component: Component, auth, allowed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          checkRole(allowed, auth.user.papel) ? (
            <Component {...props} />
          ) : (
            <div className="container box" style={{ padding: 1 + "rem" }}>
              <h2>Você não tem permissão para visitar esta página! :(</h2>
            </div>
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
