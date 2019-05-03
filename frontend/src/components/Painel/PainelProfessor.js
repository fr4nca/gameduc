import React, { Component } from "react";

import { connect } from "react-redux";

import {
  getTarefasPendentes,
  validarTarefaPendente
} from "../../store/actions/tarefaActions";

class PainelProfessor extends Component {
  componentDidMount() {
    this.props.getTarefasPendentes(this.props.auth.profile.matricula);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth !== nextProps.auth) {
      this.props.getTarefasPendentes(nextProps.auth.profile.matricula);
    }
  }

  render() {
    const { tarefas } = this.props.tarefa;

    return (
      <>
        <div className="columns">
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
              <h3 className="subtitle is-3">Games</h3>
              <hr />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ tarefa, auth }) => ({ tarefa, auth });

export default connect(
  mapStateToProps,
  { getTarefasPendentes, validarTarefaPendente }
)(PainelProfessor);
