import React, { Component } from "react";
import { connect } from "react-redux";

import Disciplina from "../../components/Disciplina/Disciplina";

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
