import React, { Component } from "react";
import Spinner from "../../pages/layout/Spinner";

import { connect } from "react-redux";

import { relatorioProfessor } from "../../store/actions/gameActions";

export class Relatorio extends Component {
  componentWillReceiveProps(nextProps) {
    const { matricula } = this.props.auth.profile;
    if (matricula !== nextProps.auth.profile.matricula)
      this.props.relatorioProfessor(nextProps.auth.profile.matricula);
  }

  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.relatorioProfessor(matricula);
  }

  render() {
    const { relatorio } = this.props.game;

    return (
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
                <span className="is-pulled-right">{relatorio.alunos}</span>
              </li>
              <li className="list-item">
                Quantidade de disciplinas vinculadas
                <span className="is-pulled-right">{relatorio.disciplinas}</span>
              </li>
              <li className="list-item">
                Quantidade de tarefas validadas
                <span className="is-pulled-right">{relatorio.tarefas}</span>
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
              <li className="list-item">
                Quantidade de tarefas validadas
                <span className="is-pulled-right">{0}</span>
              </li>
            </ul>
          )
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ game, auth }) => ({ game, auth });

export default connect(
  mapStateToProps,
  { relatorioProfessor }
)(Relatorio);
