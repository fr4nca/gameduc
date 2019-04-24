import React, { Component } from "react";

import moment from "moment";

import { connect } from "react-redux";
import { getGame } from "../../store/actions/gameActions";

import axios from "../../services/api";

import Tarefas from "../../components/Tarefa/Tarefas";
import Regras from "../../components/Regra/Regras";

class Game extends Component {
  state = { disciplina: "" };

  async componentDidMount() {
    const { id: gameId } = this.props.match.params;

    await this.props.getGame(gameId);

    const {
      game: { ta_professor_disciplina_tb_disciplina_id: disciplinaId }
    } = this.props.game;

    const { data: disciplina } = await axios.get(`/disciplina/${disciplinaId}`);
    this.setState({
      ...this.state,
      disciplina
    });
  }

  render() {
    const { game } = this.props.game;
    return (
      <>
        <h1 className="title is-1">
          <span>
            <i className="fas fa-gamepad has-text-link" /> {game.nome}
          </span>
        </h1>
        <div className="columns">
          <div className="column">
            <div className="box">
              <h3 className="subtitle is-3">Detalhes</h3>
              <hr />
              <p>
                Data de início: {moment(game.dta_inicio).format("DD/MM/YYYY")}
              </p>
              <p>
                Data de finalização: {moment(game.dta_fim).format("DD/MM/YYYY")}
              </p>
              <p>Disciplina: {this.state.disciplina.nome}</p>
            </div>
          </div>
          <div className="column">
            <Tarefas />
          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            <Regras />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  { getGame }
)(Game);
