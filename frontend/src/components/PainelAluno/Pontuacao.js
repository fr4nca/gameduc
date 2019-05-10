import React, { Component } from "react";
import Spinner from "../../pages/layout/Spinner";

import { connect } from "react-redux";
import { pontuacao } from "../../store/actions/gameActions";

class Pontuacao extends Component {
  componentWillReceiveProps(nextProps) {
    const { matricula } = this.props.auth.profile;
    if (matricula !== nextProps.auth.profile.matricula)
      this.props.pontuacao(nextProps.auth.profile.matricula);
  }

  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.pontuacao(matricula);
  }

  render() {
    const { pontuacao } = this.props.game;

    return (
      <div className="box">
        <h3 className="subtitle is-3">Pontuação</h3>
        <hr />
        {pontuacao ? (
          pontuacao.length > 0 ? (
            <>
              <h4 className="subtitle is-4">
                Sua pontuação geral é de {pontuacao[0].pontuacao} pontos em{" "}
                {pontuacao[0].tarefas} tarefas validadas de {pontuacao[1].games}{" "}
                jogos.
              </h4>
              <h4 className="subtitle is-4">
                Você ainda possui {pontuacao[2].tarefasNaoValidadas} tarefa
                {pontuacao[2].tarefasNaoValidadas > 1 ? "s" : null} pendente
                {pontuacao[2].tarefasNaoValidadas > 1 ? "s" : null} de validação
              </h4>
            </>
          ) : (
            <>
              <br />
              <p>Você ainda não pontuou</p>
            </>
          )
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, game }) => ({ auth, game });

export default connect(
  mapStateToProps,
  { pontuacao }
)(Pontuacao);
