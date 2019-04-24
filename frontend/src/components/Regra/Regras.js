import React, { Component } from "react";

import { connect } from "react-redux";

import { getRegras } from "../../store/actions/regraActions";

import Regra from "./Regra";

class Regras extends Component {
  async componentDidMount() {
    const { id } = await this.props.game.game;
    this.props.getRegras(id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.game !== nextProps.game) {
      const { id } = nextProps.game.game;
      this.props.getRegras(id);
    }
  }

  render() {
    const { regras } = this.props.regra;
    return (
      <div>
        <div className="box">
          <h3 className="subtitle is-3">Regras</h3>
          <hr />
          {regras.length > 0 ? (
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
                  <th>
                    <abbr title="Pontuação">Pontuação</abbr>
                  </th>
                </tr>
              </thead>
              <tbody>
                {regras.map(regra => (
                  <Regra key={regra.id} regra={regra} />
                ))}
              </tbody>
            </table>
          ) : (
            <h2>Não há nenhum game cadastrado</h2>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ regra, game }) => ({ regra, game });

export default connect(
  mapStateToProps,
  { getRegras }
)(Regras);
