import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getTarefas,
  deleteTarefa,
  validarTarefa
} from "../../store/actions/tarefaActions";

import Tarefa from "./Tarefa";
import AdicionarTarefa from "./AdicionarTarefa";
import EditarTarefa from "./EditarTarefa";
import Spinner from "../../pages/layout/Spinner";

class Tarefas extends Component {
  state = {
    adicionarTarefa: false,
    editarTarefa: false,
    tarefa: null,
    finished: false
  };

  componentDidMount() {
    const { id, dta_fim } = this.props.game.game;
    this.props.getTarefas(id);
    this.isFinished(dta_fim);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.game.game !== nextProps.game.game) {
      const { id, dta_fim } = nextProps.game.game;
      this.props.getTarefas(id);
      this.isFinished(dta_fim);
    }
  }

  toggleAddModal = () => {
    this.setState({
      ...this.state,
      adicionarTarefa: !this.state.adicionarTarefa
    });
  };

  toggleEditModal = tarefa => {
    this.setState({
      ...this.state,
      editarTarefa: !this.state.editarTarefa,
      tarefa
    });
  };

  isFinished = dta_fim => {
    let fim = new Date(dta_fim).getTime() / 1000;
    let hoje = new Date().getTime() / 1000;

    this.setState({
      ...this.state,
      finished: fim < hoje
    });
  };

  render() {
    const { tarefas } = this.props.tarefa;

    return (
      <div>
        {this.state.editarRegra && (
          <EditarTarefa
            toggleEditModal={this.toggleEditModal}
            tarefa={this.state.tarefa}
          />
        )}

        <div className="box">
          {!this.state.finished ? (
            <>
              <h3 className="subtitle is-3 is-pulled-left">Tarefas</h3>
              <h3 className="subtitle is-3 is-pulled-right">
                <a href="#!">
                  <i className="fas fa-plus" onClick={this.toggleAddModal} />
                  {this.state.adicionarTarefa && (
                    <AdicionarTarefa toggleAddModal={this.toggleAddModal} />
                  )}
                </a>
              </h3>
            </>
          ) : (
            <h3 className="subtitle is-3">Tarefas</h3>
          )}

          {tarefas ? (
            tarefas.length > 0 ? (
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Classificação</th>
                    <th>Tags</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {tarefas.map(tarefa => (
                    <tr key={tarefa.id}>
                      <Tarefa tarefa={tarefa} />
                      {this.props.auth.user.papel === "professor" && (
                        <>
                          <td>
                            {tarefa.validado ? null : (
                              <i
                                style={{
                                  marginRight: 20 + "px",
                                  cursor: "pointer"
                                }}
                                className="fas fa-check"
                                onClick={this.props.validarTarefa.bind(
                                  this,
                                  tarefa
                                )}
                              />
                            )}
                            <i
                              style={{ cursor: "pointer" }}
                              className="fas fa-trash"
                              onClick={this.props.deleteTarefa.bind(
                                this,
                                tarefa
                              )}
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table is-fullwidth">
                <h2>Não há nenhum game cadastrado</h2>
              </table>
            )
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tarefa, game, auth }) => ({ tarefa, game, auth });

export default connect(
  mapStateToProps,
  { getTarefas, deleteTarefa, validarTarefa }
)(Tarefas);
