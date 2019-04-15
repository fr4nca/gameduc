import React, { Component } from "react";
import { connect } from "react-redux";

import CriarDisciplina from "../../components/Disciplina/CriarDisciplina";
import VincularDisciplina from "../../components/Disciplina/VincularDisciplina";

import {
  getDisciplinas,
  getDisciplinasProfessor
} from "../../store/actions/disciplinaActions";

export class Disciplinas extends Component {
  state = {
    criarDisciplina: false
  };

  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.getDisciplinasProfessor(matricula);
    this.props.getDisciplinas();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth !== nextProps.auth) {
      const { matricula } = nextProps.auth.profile;
      this.props.getDisciplinasProfessor(matricula);
    }
  }

  criarDisciplina = () => {
    this.setState({
      ...this.state,
      criarDisciplina: !this.state.criarDisciplina
    });
  };

  render() {
    const { disciplinasProf } = this.props.disciplina;
    return (
      <>
        <h1 className="title is-1">
          <span>
            <i className="fas fa-chalkboard has-text-link" /> Disciplinas
          </span>
        </h1>
        <div className="box">
          <h3 className="subtitle is-3">Suas disciplinas</h3>
          <hr />
          {disciplinasProf.length > 0 ? (
            <div>
              {disciplinasProf.map(d => (
                <li key={d.id} className="list-item">
                  <p>{d.nome}</p>
                </li>
              ))}
            </div>
          ) : (
            <p>Não há nenhuma disciplina vinculada</p>
          )}
          <ul />
        </div>
        <div className="columns">
          <div className="column is-6">
            <VincularDisciplina />
          </div>
          <div className="column is-6">
            {this.state.criarDisciplina ? (
              <CriarDisciplina />
            ) : (
              <span>
                Não encontrou a disciplina desejada?{" "}
                <button
                  onClick={this.criarDisciplina}
                  className="button is-rounded is-small is-link"
                >
                  Adicionar uma disciplina
                </button>
              </span>
            )}
          </div>
        </div>
      </>
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
