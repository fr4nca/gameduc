import React, { Component } from "react";

import { connect } from "react-redux";
import { getGame } from "../../store/actions/gameActions";

import axios from "../../services/api";

import Tarefas from "../../components/Tarefa/Tarefas";
import Regras from "../../components/Regra/Regras";
import Grafico from "../../components/Ranking/Grafico";
import Ranking from "../../components/Ranking/Ranking";

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
        <div className="columns is-multiline">
          <div className="column is-6">
            <Ranking />
          </div>
          <div className="column is-6">
            <Grafico />
          </div>
          <div className="column is-6">
            <Regras />
          </div>
          <div className="column is-6">
            <Tarefas />
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
