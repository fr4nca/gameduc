import React, { Component } from "react";
import { connect } from "react-redux";

import { getDisciplinasProfessor } from "../../store/actions/disciplinaActions";
import { criarGame, getGames } from "../../store/actions/gameActions";
import Spinner from "../../pages/layout/Spinner";

class CriarGame extends Component {
  state = {
    nome: "",
    dta_inicio: "",
    dta_fim: "",
    matricula: "",
    disciplinaId: ""
  };

  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.getDisciplinasProfessor(matricula);
  }

  handleSubmit = e => {
    e.preventDefault();

    const game = {
      ...this.state
    };

    const { matricula } = this.props.auth.profile;

    game.matricula = matricula;

    this.props.criarGame(game);
    this.props.toggle();

    this.setState({
      nome: "",
      dta_inicio: "",
      dta_fim: "",
      matricula: "",
      disciplinaId: ""
    });
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { disciplinasProf } = this.props.disciplina;
    return (
      <div className="box">
        <h3 className="subtitle is-3">Criar game</h3>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="nome" className="label">
              Nome
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.nome}
              placeholder="Digite o nome do game"
              type="text"
              name="nome"
              className="control input is-rounded"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="dta_inicio" className="label">
              Data de início
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.dta_inicio}
              placeholder="Data de início"
              type="date"
              name="dta_inicio"
              className="control input is-rounded"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="dta_inicio" className="label">
              Data de finalização
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.dta_fim}
              name="dta_fim"
              className="control input is-rounded"
              type="date"
              required
              placeholder="Data de finalização"
            />
          </div>
          <div className="field">
            <label htmlFor="disciplinaId" className="label">
              Disciplina
            </label>
            <div className="select is-rounded">
              <select
                value={this.state.disciplinaId}
                onChange={this.handleChange}
                name="disciplinaId"
                required
              >
                <option value="" disabled>
                  Selecione a opção
                </option>
                {disciplinasProf ? (
                  disciplinasProf.length > 0 ? (
                    disciplinasProf.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.nome}
                      </option>
                    ))
                  ) : (
                    <p>Você não possui disciplinas vinculadas</p>
                  )
                ) : (
                  <Spinner />
                )}
              </select>
            </div>
          </div>
          <input
            type="submit"
            className=" button is-rounded is-link"
            value="Criar"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ disciplina, auth }) => ({ disciplina, auth });

export default connect(
  mapStateToProps,
  { getDisciplinasProfessor, criarGame, getGames }
)(CriarGame);
