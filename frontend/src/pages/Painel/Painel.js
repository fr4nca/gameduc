import React, { Component } from "react";
import { connect } from "react-redux";

import PainelAluno from "../../components/PainelAluno/PainelAluno";
import PainelProfessor from "../../components/PainelProfessor/PainelProfessor";

class Painel extends Component {
  render() {
    const { papel } = this.props.auth.user;
    return (
      <>
        <h1 className="title is-1">
          <span>
            <i className="fas fa-tachometer-alt has-text-link" /> Painel
          </span>
        </h1>
        {papel === "professor" ? <PainelProfessor /> : <PainelAluno />}
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(Painel);
