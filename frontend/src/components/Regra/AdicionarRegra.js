import React, { Component } from "react";
import { connect } from "react-redux";

import { addRegra } from "../../store/actions/regraActions";

class AdicionarRegra extends Component {
  state = {
    classificacao: "",
    tag: "",
    descricao: "",
    pontuacao: ""
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  criarRegra = () => {
    const regra = {
      classificacao: this.state.classificacao,
      tag: this.state.tag,
      descricao: this.state.descricao,
      pontuacao: this.state.pontuacao,
      gameId: this.props.game.game.id
    };

    this.props.addRegra(regra);
    this.props.toggleModal();
  };

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Nova regra</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.toggleModal}
            />
          </header>
          <section className="modal-card-body">
            <form>
              <div className="field">
                <label className="label">Descrição</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Descrição"
                    name="descricao"
                    onChange={this.handleChange}
                    value={this.state.descricao}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Classificação</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Classificação"
                    name="classificacao"
                    onChange={this.handleChange}
                    value={this.state.classificacao}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tag</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Tag"
                    name="tag"
                    onChange={this.handleChange}
                    value={this.state.tag}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Pontuação</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    placeholder="Pontuação"
                    name="pontuacao"
                    onChange={this.handleChange}
                    value={this.state.pontuacao}
                  />
                </div>
              </div>
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-link" onClick={this.criarRegra}>
              Adicionar
            </button>
            <button className="button" onClick={this.props.toggleModal}>
              Cancelar
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  { addRegra }
)(AdicionarRegra);
