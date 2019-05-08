import React, { Component } from "react";

import { connect } from "react-redux";
import { getGame } from "../../store/actions/gameActions";

import Tarefas from "../../components/Tarefa/Tarefas";
import Regras from "../../components/Regra/Regras";
import Grafico from "../../components/Ranking/Grafico";
import Ranking from "../../components/Ranking/Ranking";
import Alunos from "../../components/Aluno/Alunos";

class Game extends Component {
  async componentDidMount() {
    const { id: gameId } = this.props.match.params;

    this.props.getGame(gameId);
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
          <div className="column is-6">
            <Alunos />
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
