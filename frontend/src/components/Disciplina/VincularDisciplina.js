import React, { Component } from "react";
import { connect } from "react-redux";

import {
  vincularDisciplina,
  getDisciplinasProfessor
} from "../../actions/disciplinaActions";

class VincularDisciplina extends Component {
  state = {
    disciplinaId: ""
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { disciplinaId } = this.state;
    const { matricula } = this.props.auth.profile;
    this.props.vincularDisciplina(matricula, disciplinaId);
    this.props.getDisciplinasProfessor(matricula);
  };

  render() {
    const { disciplinas } = this.props.disciplina;
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="select is-rounded">
              <select
                value={this.state.disciplinaId}
                onChange={this.handleChange}
                name="disciplinaId"
              >
                <option value="" disabled>
                  Selecione a opção
                </option>
                {disciplinas.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="submit"
            value="Vincular"
            className="button is-rounded is-link"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ disciplina, auth }) => ({ disciplina, auth });

export default connect(
  mapStateToProps,
  { vincularDisciplina, getDisciplinasProfessor }
)(VincularDisciplina);
