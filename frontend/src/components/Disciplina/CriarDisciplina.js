import React, { Component } from "react";

import { connect } from "react-redux";

import {
  criarDisciplina,
  getDisciplinas
} from "../../actions/disciplinaActions";

class CriarDisciplina extends Component {
  state = {
    nome: "",
    msg: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { nome } = this.state;

    const disciplina = {
      nome
    };

    this.props.criarDisciplina(disciplina);
    this.props.getDisciplinas();

    this.setState({
      ...this.state,
      nome: ""
    });
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <input
              onChange={this.handleChange}
              value={this.state.nome}
              placeholder="Digite o nome da disciplina"
              type="text"
              name="nome"
              className="control input is-rounded"
              required
            />
          </div>
          <input
            type="submit"
            className="button is-rounded is-link"
            value="Criar"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ disciplina }) => ({ disciplina });

export default connect(
  mapStateToProps,
  { criarDisciplina, getDisciplinas }
)(CriarDisciplina);
