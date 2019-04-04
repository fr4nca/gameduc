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
        <div className="box">
          <h4 className="title">Suas disciplinas</h4>
          <ul className="list is-hoverable">
            {disciplinasProf.map(d => (
              <li key={d.id} className="list-item">
                <Disciplina disciplina={d} />
              </li>
            ))}
          </ul>
        </div>
        <div className="columns">
          <div className="column">
            <CriarDisciplina />
          </div>
          <div className="column">
            <VincularDisciplina />
          </div>
        </div>
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
