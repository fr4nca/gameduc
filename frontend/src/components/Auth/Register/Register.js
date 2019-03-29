import React, { Component } from "react";

import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";

export class Register extends Component {
  state = {
    nome: "",
    sobrenome: "",
    matricula: "",
    dta_nascimento: "",
    curso: "",
    email: "",
    senha: "",
    papel: ""
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      nome,
      sobrenome,
      matricula,
      dta_nascimento,
      curso,
      email,
      senha,
      papel
    } = this.state;

    const newUser = {
      nome,
      sobrenome,
      matricula,
      dta_nascimento,
      curso,
      email,
      senha,
      papel
    };

    newUser.dta_nascimento = "2019-01-01";

    console.log(newUser);
    this.props.registerUser(newUser);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input
            required
            onChange={this.handleChange}
            type="text"
            name="nome"
          />
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            required
            onChange={this.handleChange}
            type="text"
            name="sobrenome"
          />
          <label htmlFor="matricula">Matricula</label>
          <input
            required
            onChange={this.handleChange}
            type="text"
            name="matricula"
          />
          <label htmlFor="dta_nascimento">Data de nascimento</label>
          <input
            required
            onChange={this.handleChange}
            type="date"
            name="dta_nascimento"
          />
          <label htmlFor="curso">Curso</label>
          <input
            required
            onChange={this.handleChange}
            type="text"
            name="curso"
          />
          <label htmlFor="email">Email</label>
          <input
            required
            onChange={this.handleChange}
            type="email"
            name="email"
          />
          <label htmlFor="senha">Senha</label>
          <input
            required
            onChange={this.handleChange}
            type="password"
            name="senha"
          />
          <label htmlFor="papel">Papel</label>
          <div>
            <label>
              <input
                required
                onChange={this.handleChange}
                type="radio"
                name="papel"
                value="aluno"
              />
              Aluno
            </label>
            <label>
              <input
                required
                onChange={this.handleChange}
                type="radio"
                name="papel"
                value="professor"
              />
              Professor
            </label>
          </div>
          <input type="submit" value="Cadastrar" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
