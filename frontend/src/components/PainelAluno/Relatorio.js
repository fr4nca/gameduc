import React, { Component } from "react";
import Spinner from "../../pages/layout/Spinner";

import { connect } from "react-redux";

import { relatorioAluno } from "../../store/actions/gameActions";

export class Relatorio extends Component {
  componentWillReceiveProps(nextProps) {
    const { matricula } = this.props.auth.profile;
    if (matricula !== nextProps.auth.profile.matricula)
      this.props.relatorioAluno(nextProps.auth.profile.matricula);
  }

  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.relatorioAluno(matricula);
  }

  render() {
    const { relatorio } = this.props.game;

    return (
      <div className="box">
        <h3 className="subtitle is-3">Relatório</h3>
        <hr />
        {relatorio ? (
          relatorio.length > 0 ? (
            <ul>
              <li
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <strong>Nome do game</strong>
                <strong>Tarefas validadas</strong>
                <strong>Pontuação</strong>
              </li>
              {relatorio.map(relatorio => (
                <li
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                  key={relatorio.nome}
                >
                  <span>{relatorio.nome}</span>
                  <span>{relatorio.tarefas}</span>
                  <span>{relatorio.pontuacao}</span>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <br />
              <p>Você não faz parte de nenhum game</p>
            </>
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
  { relatorioAluno }
)(Relatorio);
