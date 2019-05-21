import React from "react";

import { connect } from "react-redux";
import DashboardProfessor from "./DashboardProfessor";
import DashboardAluno from "./DashboardAluno";

const Dashboard = props => {
  return (
    <>
      {props.auth.user.papel === "professor" ? (
        <DashboardProfessor navigation={props.navigation} />
      ) : (
        <DashboardAluno navigation={props.navigation} />
      )}
    </>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
