import React, { Component } from "react";

import { connect } from "react-redux";

import { editPerfil } from "../../store/actions/perfilActions";
import moment from "moment";

export class EditarPerfil extends Component {
  state = {
    nome: "",
    sobrenome: "",
    dta_nascimento: "",
    graduacao: "",
    curso: "",
    email: ""
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      ...this.props.auth.profile,
      dta_nascimento: moment(this.props.auth.profile.dta_nascimento).format(
        "YYYY-MM-DD"
      ),
      email: this.props.auth.user.email
    });
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  editPerfil = e => {
    e.preventDefault();

    const perfil = {
      ...this.state,
      matricula: this.props.auth.profile.matricula
    };
    const user = {
      email: this.state.email
    };

    this.props.editPerfil(perfil, user);
    this.props.toggleEditModal();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Editar Perfil</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.toggleEditModal}
            />
          </header>
          <form onSubmit={this.editPerfil}>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Nome</label>
                <div className="control">
                  <textarea
                    className="input"
                    placeholder="Nome"
                    name="nome"
                    onChange={this.handleChange}
                    required
                    value={this.state.nome}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Sobrenome</label>
                <div className="control">
                  <input
                    className="input"
                    required
                    type="text"
                    placeholder="Sobrenome"
                    name="sobrenome"
                    onChange={this.handleChange}
                    value={this.state.sobrenome}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Data de Nascimento</label>
                <div className="control">
                  <input
                    required
                    className="control input is-rounded"
                    type="date"
                    placeholder="DataDeNascimento"
                    name="dta_nascimento"
                    onChange={this.handleChange}
                    value={this.state.dta_nascimento}
                  />
                </div>
              </div>
              {user.papel === "professor" ? (
                <div className="field">
                  <label className="label">Graduação</label>
                  <div className="control">
                    <input
                      className="input"
                      required
                      type="text"
                      placeholder="Curso"
                      name="graduacao"
                      onChange={this.handleChange}
                      value={this.state.graduacao}
                    />
                  </div>
                </div>
              ) : (
                <div className="field">
                  <label className="label">Curso</label>
                  <div className="control">
                    <input
                      className="input"
                      required
                      type="text"
                      placeholder="curso"
                      name="curso"
                      onChange={this.handleChange}
                      value={this.state.curso}
                    />
                  </div>
                </div>
              )}
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    required
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <input type="submit" className="button is-link" value="Editar" />
              <button className="button" onClick={this.props.toggleEditModal}>
                Cancelar
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { editPerfil }
)(EditarPerfil);
