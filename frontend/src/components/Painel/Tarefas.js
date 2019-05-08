import React, { Component } from "react";
import Spinner from "../../pages/layout/Spinner";

import { connect } from "react-redux";

import { getTarefasPendentes } from "../../store/actions/tarefaActions";

export class Tarefas extends Component {
  componentWillReceiveProps(nextProps) {
    const { matricula } = this.props.auth.profile;
    if (matricula !== nextProps.auth.profile.matricula)
      this.props.getTarefasPendentes(nextProps.auth.profile.matricula);
  }

  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.getTarefasPendentes(matricula);
  }

  render() {
    const { tarefas } = this.props.tarefa;

    return (
      <div className="box">
        <h3 className="subtitle is-3">Validar tarefas pendentes</h3>
        <hr />
        <ul>
          {tarefas ? (
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
    );
  }
}

const mapStateToProps = ({ tarefa, auth }) => ({ tarefa, auth });

export default connect(
  mapStateToProps,
  { getTarefasPendentes }
)(Tarefas);
