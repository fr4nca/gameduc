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
          checkRole(allowed, auth.user.role) ? (
            <Component {...props} />
          ) : (
            <h1>Poti nãum</h1>
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
