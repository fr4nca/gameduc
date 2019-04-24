import React, { Component } from "react";

import { connect } from "react-redux";

import { getRegras } from "../../store/actions/regraActions";

import Regra from "./Regra";
import AdicionarRegra from "./AdicionarRegra";

class Regras extends Component {
  state = {
    adicionarRegra: false
  };

  async componentDidMount() {
    const { id } = await this.props.game.game;
    this.props.getRegras(id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.game !== nextProps.game) {
      const { id } = nextProps.game.game;
      this.props.getRegras(id);
    }

    if (this.props.regra !== nextProps.regra) {
      const { id } = nextProps.game.game;
      this.props.getRegras(id);
    }
  }

  toggleModal = () => {
    this.setState({
      ...this.state,
      adicionarRegra: !this.state.adicionarRegra
    });
  };

  render() {
    const { regras } = this.props.regra;
    return (
      <div>
        {this.state.adicionarRegra && (
          <AdicionarRegra toggleModal={this.toggleModal} />
        )}
        <div className="box">
          <h3 className="subtitle is-3 is-pulled-left">Regras</h3>
          {this.props.auth.user.papel === "professor" && (
            <h3 className="subtitle is-3 is-pulled-right">
              <a href="#!">
                <i className="fas fa-plus" onClick={this.toggleModal} />
              </a>
            </h3>
          )}

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
                  <th />
                </tr>
              </thead>
              <tbody>
                {regras.map(regra => (
                  <tr key={regra.id}>
                    <Regra regra={regra} />
                    {this.props.auth.user.papel === "professor" && (
                      <td>
                        <i className="delete" />
                      </td>
                    )}
                  </tr>
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

const mapStateToProps = ({ regra, game, auth }) => ({ regra, game, auth });

export default connect(
  mapStateToProps,
  { getRegras }
)(Regras);
