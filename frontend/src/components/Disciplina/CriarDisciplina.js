import React, { Component } from "react";

import { connect } from "react-redux";

import { criarDisciplina } from "../../actions/disciplinaActions";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.nome}
            type="text"
            name="nome"
            id="nome"
          />
          <input type="submit" value="Criar" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ disciplina }) => ({ disciplina });

export default connect(
  mapStateToProps,
  { criarDisciplina }
)(CriarDisciplina);
