import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import CriarDisciplina from "../../components/Disciplina/CriarDisciplina";
import VincularDisciplina from "../../components/Disciplina/VincularDisciplina";

import {
  getDisciplinas,
  getDisciplinasProfessor,
  desvincularDisciplina
} from "../../store/actions/disciplinaActions";

export class Disciplinas extends Component {
  state = {
    criarDisciplina: false
  };

  componentWillReceiveProps(nextProps) {
    const { matricula } = this.props.auth.profile;
    if (matricula !== nextProps.auth.profile.matricula) {
      this.props.getDisciplinas();
      this.props.getDisciplinasProfessor(nextProps.auth.profile.matricula);
    }
  }

  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.getDisciplinas();
    this.props.getDisciplinasProfessor(matricula);
  }

  criarDisciplina = () => {
    this.setState({
      ...this.state,
      criarDisciplina: !this.state.criarDisciplina
    });
  };

  delete = id => {
    this.props.desvincularDisciplina(this.props.auth.profile.matricula, id);
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
          {disciplinasProf ? (
            disciplinasProf.length > 0 ? (
              <div>
                {disciplinasProf.map(d => (
                  <li key={d.id} className="list-item">
                    {d.nome}
                    <i
                      className="fas fa-trash is-pulled-right"
                      style={{
                        marginTop: 4 + "px",
                        cursor: "pointer"
                      }}
                      onClick={this.delete.bind(this, d.id)}
                    />
                  </li>
                ))}
              </div>
            ) : (
              <p>Não há nenhuma disciplina vinculada</p>
            )
          ) : (
            <Spinner />
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
  { getDisciplinas, getDisciplinasProfessor, desvincularDisciplina }
)(Disciplinas);
