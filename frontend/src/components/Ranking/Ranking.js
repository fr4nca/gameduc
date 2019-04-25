import React, { Component } from "react";

import { connect } from "react-redux";
import { getRanking } from "../../store/actions/gameActions";

class Ranking extends Component {
  componentDidMount() {
    this.props.getRanking(this.props.game.game.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.game.game !== nextProps.game.game) {
      this.props.getRanking(nextProps.game.game.id);
    }
  }

  render() {
    const { ranking } = this.props.game;
    let posicao = 0;

    return (
      <div>
        <div className="box">
          <h3 className="subtitle is-3 ">Ranking</h3>

          {ranking.length > 0 ? (
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>
                    <abbr title="Posição">Posição</abbr>
                  </th>
                  <th>
                    <abbr title="Matricula">Matricula</abbr>
                  </th>
                  <th>
                    <abbr title="Nome">Nome</abbr>
                  </th>
                  <th>
                    <abbr title="Pontuação">Pontuação</abbr>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ranking.map(aluno => {
                  posicao++;
                  return (
                    <tr key={aluno.matricula}>
                      <td>{posicao}</td>
                      <td>{aluno.matricula}</td>
                      <td>{aluno.nome}</td>
                      <td>{aluno.soma}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="table is-fullwidth">
              <h2>Nenhum aluno pontuou</h2>
            </table>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  { getRanking }
)(Ranking);
