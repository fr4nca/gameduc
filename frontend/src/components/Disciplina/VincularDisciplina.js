import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getDisciplinas,
  vincularDisciplina
} from "../../actions/disciplinaActions";

class VincularDisciplina extends Component {
  state = {
    disciplinaId: ""
  };

  componentDidMount() {
    this.props.getDisciplinas();
  }

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
  };

  render() {
    const { disciplinas } = this.props.disciplina;
    return (
      <form onSubmit={this.handleSubmit}>
        <select
          value={this.state.disciplinaId}
          onChange={this.handleChange}
          name="disciplinaId"
        >
          {disciplinas.map(d => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
        </select>
        <input type="submit" value="Vincular" />
      </form>
    );
  }
}

const mapStateToProps = ({ disciplina, auth }) => ({ disciplina, auth });

export default connect(
  mapStateToProps,
  { getDisciplinas, vincularDisciplina }
)(VincularDisciplina);
