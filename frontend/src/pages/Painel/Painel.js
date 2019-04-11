import React, { Component } from "react";
import { connect } from "react-redux";

import { getGames } from "../../store/actions/gameActions";

import PainelAluno from "../../components/Painel/PainelAluno";
import PainelProfessor from "../../components/Painel/PainelProfessor";

class Painel extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  render() {
    const { papel } = this.props.auth.user;
    return papel === "professor" ? <PainelProfessor /> : <PainelAluno />;
  }
}

const mapStateToProps = ({ auth, game }) => ({
  auth,
  game
});

export default connect(
  mapStateToProps,
  { getGames }
)(Painel);
