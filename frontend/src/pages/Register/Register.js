import React, { Component } from "react";
import moment from "moment";

import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";

export class Register extends Component {
  state = {
    nome: "",
    sobrenome: "",
    matricula: "",
    dta_nascimento: "",
    curso: "",
    email: "",
    senha: "",
    papel: "",
    conSenha: "",
    graduacao: ""
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
      papel,
      graduacao,
      conSenha
    } = this.state;

    if (senha !== conSenha) {
      alert("As senhas devem coincidir");
      return;
    }

    const newUser = {
      nome,
      sobrenome,
      matricula,
      dta_nascimento,
      curso,
      email,
      senha,
      graduacao,
      papel
    };

    newUser.dta_nascimento = moment(dta_nascimento).format("YYYY-MM-DD");
    this.props.registerUser(newUser);
    this.props.history.push("/login");
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 90 + "vh"
        }}
      >
        <div
          className="container box"
          style={{
            width: 550 + "px",
            padding: 1.5 + "rem"
          }}
        >
          <h3 className="title has-text-centered">Registre-se</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.handleChange}
                  value={this.state.nome}
                  name="nome"
                  required
                  className="input is-rounded"
                  type="text"
                  placeholder="Nome"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user-circle" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.handleChange}
                  value={this.state.sobrenome}
                  name="sobrenome"
                  required
                  className="input is-rounded"
                  type="text"
                  placeholder="Sobrenome"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user-circle" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.handleChange}
                  value={this.state.matricula}
                  name="matricula"
                  required
                  className="input is-rounded"
                  type="text"
                  placeholder="Matricula"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-id-badge" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.handleChange}
                  value={this.state.dta_nascimento}
                  name="dta_nascimento"
                  required
                  className="input is-rounded"
                  type="date"
                  placeholder="Data de nascimento"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-calendar-alt" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                  required
                  className="input is-rounded"
                  type="text"
                  placeholder="Email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-at" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.handleChange}
                  value={this.state.senha}
                  name="senha"
                  required
                  className="input is-rounded"
                  type="password"
                  placeholder="Senha"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-key" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.handleChange}
                  value={this.state.conSenha}
                  name="conSenha"
                  required
                  className="input is-rounded"
                  type="password"
                  placeholder="Confirme sua senha"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-key" />
                </span>
              </p>
            </div>
            <label htmlFor="papel">Papel</label>
            <div className="field control">
              <label className="radio">
                <input
                  required
                  onChange={this.handleChange}
                  type="radio"
                  name="papel"
                  value="aluno"
                />
                Aluno
              </label>
              <label className="radio">
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
            {this.state.papel === "professor" ? (
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    onChange={this.handleChange}
                    value={this.state.graduacao}
                    name="graduacao"
                    required
                    className="input is-rounded"
                    type="text"
                    placeholder="Graduação"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-graduation-cap" />
                  </span>
                </p>
              </div>
            ) : this.state.papel === "aluno" ? (
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    onChange={this.handleChange}
                    value={this.state.curso}
                    name="curso"
                    required
                    className="input is-rounded"
                    type="text"
                    placeholder="Curso"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-university" />
                  </span>
                </p>
              </div>
            ) : null}
            <div className="field">
              <p className="control">
                <input
                  type="submit"
                  className="button is-link is-pulled-right is-rounded"
                  value="Registrar"
                />
              </p>
            </div>
          </form>
        </div>
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
