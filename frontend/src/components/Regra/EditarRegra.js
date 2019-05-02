import React, { Component } from "react";
import { connect } from "react-redux";

import { editRegra } from "../../store/actions/regraActions";

class EditarRegra extends Component {
  state = {
    classificacao: "",
    descricao: "",
    tag: "",
    pontuacao: 0,
    id: 0
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      ...this.props.regra
    });
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  editarRegra = e => {
    e.preventDefault();

    this.props.editRegra(this.state);
    this.props.toggleEditModal();
  };

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Editar regra</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.toggleEditModal}
            />
          </header>
          <form onSubmit={this.editarRegra}>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Descrição</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Descrição"
                    name="descricao"
                    onChange={this.handleChange}
                    required
                    value={this.state.descricao}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Classificação</label>
                <div className="control">
                  <input
                    className="input"
                    required
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
                    required
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
                    required
                    className="input"
                    type="number"
                    placeholder="Pontuação"
                    name="pontuacao"
                    onChange={this.handleChange}
                    value={this.state.pontuacao}
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

const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  { editRegra }
)(EditarRegra);
