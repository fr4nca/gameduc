import React, { Component } from "react";

import { connect } from "react-redux";

import {
  getTarefasPendentes,
  validarTarefaPendente
} from "../../store/actions/tarefaActions";

import { relatorioProfessor } from "../../store/actions/authActions";

import { getGames } from "../../store/actions/gameActions";
import GameMiniCard from "../Game/GameMiniCard";

class PainelProfessor extends Component {
  componentDidMount() {
    this.props.getTarefasPendentes(this.props.auth.profile.matricula);
    this.props.relatorioProfessor(this.props.auth.profile.matricula);
    this.props.getGames(this.props.auth.profile.matricula);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.profile !== nextProps.auth.profile) {
      this.props.getTarefasPendentes(nextProps.auth.profile.matricula);
      this.props.relatorioProfessor(nextProps.auth.profile.matricula);
      this.props.getGames(nextProps.auth.profile.matricula);
    }
  }

  render() {
    const { tarefas } = this.props.tarefa;
    const { games } = this.props.game;

    return (
      <>
        <div className="columns is-multiline">
          <div className="column is-6">
            <div className="box">
              <h3 className="subtitle is-3">Validar tarefas pendentes</h3>
              <hr />
              <ul>
                {tarefas.length > 0 ? (
                  tarefas.map(tarefa => (
                    <li key={tarefa.id} className="list-item">
                      {tarefa.descricao}
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-check is-pulled-right is-vcentered"
                        onClick={this.props.validarTarefaPendente.bind(
                          this,
                          tarefa,
                          this.props.auth.profile.matricula
                        )}
                      />
                    </li>
                  ))
                ) : (
                  <p>Não há tarefas a serem validadas</p>
                )}
              </ul>
            </div>
          </div>

          <div className="column is-6">
            <div className="box">
              <h3 className="subtitle is-3">Relatório</h3>
              <hr />
              <ul>
                <li className="list-item">
                  Quantidade de games ativos
                  <span className="is-pulled-right">
                    {this.props.auth.relatorio.games}
                  </span>
                </li>
                <li className="list-item">
                  Quantidade de alunos
                  <span className="is-pulled-right">
                    {this.props.auth.relatorio.alunos}
                  </span>
                </li>
                <li className="list-item">
                  Quantidade de disciplinas vinculadas
                  <span className="is-pulled-right">
                    {this.props.auth.relatorio.disciplinas}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="column is-6">
            <div className="box">
              <h3 className="subtitle is-3">Games</h3>
              <hr />
              <ul>
                {games.map(game => (
                  <GameMiniCard key={game.id} game={game} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ tarefa, auth, game }) => ({ tarefa, auth, game });

export default connect(
  mapStateToProps,
  { getTarefasPendentes, validarTarefaPendente, relatorioProfessor, getGames }
)(PainelProfessor);
