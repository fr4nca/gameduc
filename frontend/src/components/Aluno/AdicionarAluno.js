import React, { Component } from "react";
import { connect } from "react-redux";

import { addAluno } from "../../store/actions/gameActions";

class AdicionarAluno extends Component {
  state = {
    matricula: ""
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  adicionarAluno = e => {
    e.preventDefault();

    this.props.addAluno(this.state.matricula, this.props.game.game.id);
    this.props.toggleAddModal();
  };

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Adicionar aluno</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.toggleAddModal}
            />
          </header>
          <form onSubmit={this.criarRegra}>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Aluno</label>
                <div className="control select">
                  <select
                    value={this.state.matricula}
                    onChange={this.handleChange}
                    name="matricula"
                    required
                  >
                    <option value="" disabled>
                      Nome/RA
                    </option>
                    {/* {this.props.game.alunos.map(aluno => (
                      <option key={aluno.matricula} value={aluno.matricula}>
                        {aluno.nome}/{aluno.matricula}
                      </option>
                    ))} */}
                  </select>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <input
                type="submit"
                className="button is-link"
                value="Adicionar"
              />
              <button className="button" onClick={this.props.toggleAddModal}>
                Cancelar
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  { addAluno }
)(AdicionarAluno);
