import React, { Component } from "react";
import { connect } from "react-redux";

import Disciplina from "../../components/Disciplina/Disciplina";
import CriarDisciplina from "../../components/Disciplina/CriarDisciplina";
import VincularDisciplina from "../../components/Disciplina/VincularDisciplina";

import {
  getDisciplinas,
  getDisciplinasProfessor
} from "../../actions/disciplinaActions";

export class Disciplinas extends Component {
  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.getDisciplinas();
    this.props.getDisciplinasProfessor(matricula);
  }

  componentWillReceiveProps(nextProps) {
    const { matricula } = nextProps.auth.profile;
    this.props.getDisciplinasProfessor(matricula);
  }

  render() {
    const { disciplinasProf } = this.props.disciplina;
    return (
      <div>
        {disciplinasProf.map(d => (
          <Disciplina key={d.id} disciplina={d} />
        ))}
        <CriarDisciplina />
        <VincularDisciplina />
      </div>
    );
  }
}

const mapStateToProps = ({ disciplina, auth }) => ({
  disciplina,
  auth
});

export default connect(
  mapStateToProps,
  { getDisciplinas, getDisciplinasProfessor }
)(Disciplinas);
