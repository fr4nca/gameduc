import React, { Component } from "react";

import { connect } from "react-redux";

import {
  getTarefasPendentes,
  validarTarefaPendente
} from "../../store/actions/tarefaActions";

import { relatorioProfessor } from "../../store/actions/gameActions";

import Spinner from "../../pages/layout/Spinner";
import Games from "./Games";

class PainelProfessor extends Component {
  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.getTarefasPendentes(matricula);
    this.props.relatorioProfessor(matricula);
  }

  render() {
    const { tarefas } = this.props.tarefa;
    const { relatorio } = this.props.game;

    return (
      <>
        <div className="columns is-multiline">
          <div className="column is-6">
            <div className="box">
              <h3 className="subtitle is-3">Validar tarefas pendentes</h3>
              <hr />
              <ul>
                {tarefas !== undefined ? (
                  tarefas.length > 0 ? (
                    tarefas.map(tarefa => (
                      <li
                        key={tarefa.id}
                        className="list-item"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <span>{tarefa.descricao}</span>
                        <span>{tarefa.nome}</span>
                        <i
                          style={{ cursor: "pointer" }}
                          className="fas fa-check"
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
                  )
                ) : (
                  <Spinner />
                )}
              </ul>
            </div>
          </div>

          <div className="column is-6">
            <div className="box">
              <h3 className="subtitle is-3">Relatório</h3>
              <hr />
              {relatorio ? (
                Object.keys(relatorio).length > 0 ? (
                  <ul>
                    <li className="list-item">
                      Quantidade de games ativos
                      <span className="is-pulled-right">{relatorio.games}</span>
                    </li>
                    <li className="list-item">
                      Quantidade de alunos
                      <span className="is-pulled-right">
                        {relatorio.alunos}
                      </span>
                    </li>
                    <li className="list-item">
                      Quantidade de disciplinas vinculadas
                      <span className="is-pulled-right">
                        {relatorio.disciplinas}
                      </span>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li className="list-item">
                      Quantidade de games ativos
                      <span className="is-pulled-right">{0}</span>
                    </li>
                    <li className="list-item">
                      Quantidade de alunos
                      <span className="is-pulled-right">{0}</span>
                    </li>
                    <li className="list-item">
                      Quantidade de disciplinas vinculadas
                      <span className="is-pulled-right">{0}</span>
                    </li>
                  </ul>
                )
              ) : (
                <Spinner />
              )}
            </div>
          </div>

          <div className="column is-6">
            <Games />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ tarefa, auth, game }) => ({ tarefa, auth, game });

export default connect(
  mapStateToProps,
  { getTarefasPendentes, validarTarefaPendente, relatorioProfessor }
)(PainelProfessor);
