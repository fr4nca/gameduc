import React, { Component } from "react";
import { connect } from "react-redux";

import { getTarefas } from "../../store/actions/tarefaActions";

import Tarefa from "./Tarefa";

class Tarefas extends Component {
  componentDidMount() {
    const { id } = this.props.game.game;
    this.props.getTarefas(id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.game !== nextProps.game) {
      const { id } = nextProps.game.game;
      this.props.getTarefas(id);
    }
  }

  render() {
    const { tarefas } = this.props.tarefa;

    return (
      <div>
        <div className="box">
          <h3 className="subtitle is-3 is-pulled-left">Tarefas</h3>
          {this.props.auth.user.papel === "professor" && (
            <h3 className="subtitle is-3 is-pulled-right">
              <a>
                <i className="fas fa-plus" />
              </a>
            </h3>
          )}

          {tarefas.length > 0 ? (
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>
                    <abbr title="Id">Id</abbr>
                  </th>
                  <th>
                    <abbr title="Classificação">Classificação</abbr>
                  </th>
                  <th>
                    <abbr title="Tags">Tags</abbr>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tarefas.map(tarefa => (
                  <tr key={tarefa.id}>
                    <Tarefa tarefa={tarefa} />
                    {this.props.auth.user.papel === "professor" && (
                      <td>
                        <a className="delete" />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2>Não há nenhuma tarefa cadastrado</h2>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tarefa, game, auth }) => ({ tarefa, game, auth });

export default connect(
  mapStateToProps,
  { getTarefas }
)(Tarefas);
