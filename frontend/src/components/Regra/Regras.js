import React, { Component } from "react";

import { connect } from "react-redux";

import { getRegras, deleteRegra } from "../../store/actions/regraActions";

import Regra from "./Regra";
import AdicionarRegra from "./AdicionarRegra";
import EditarRegra from "./EditarRegra";
import Spinner from "../../pages/layout/Spinner";

class Regras extends Component {
  state = {
    adicionarRegra: false,
    editarRegra: false,
    regra: null,
    finished: false
  };

  componentDidMount() {
    const { id, dta_fim } = this.props.game.game;
    this.props.getRegras(id);
    this.isFinished(dta_fim);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.game.game !== nextProps.game.game) {
      const { id, dta_fim } = nextProps.game.game;
      this.props.getRegras(id);
      this.isFinished(dta_fim);
    }
  }

  isFinished = dta_fim => {
    let fim = new Date(dta_fim).getTime() / 1000;
    let hoje = new Date().getTime() / 1000;

    this.setState({
      ...this.state,
      finished: fim < hoje
    });
  };

  toggleAddModal = () => {
    this.setState({
      ...this.state,
      adicionarRegra: !this.state.adicionarRegra
    });
  };

  toggleEditModal = regra => {
    this.setState({
      ...this.state,
      editarRegra: !this.state.editarRegra,
      regra
    });
  };

  render() {
    const { regras } = this.props.regra;

    return (
      <div>
        {this.state.editarRegra && (
          <EditarRegra
            toggleEditModal={this.toggleEditModal}
            regra={this.state.regra}
          />
        )}

        <div className="box">
          {this.props.auth.user.papel === "professor" &&
          !this.state.finished ? (
            <>
              <h3 className="subtitle is-3 is-pulled-left">Regras</h3>
              <h3 className="subtitle is-3 is-pulled-right">
                <a href="#!">
                  <i className="fas fa-plus" onClick={this.toggleAddModal} />
                  {this.state.adicionarRegra ? (
                    <AdicionarRegra toggleAddModal={this.toggleAddModal} />
                  ) : null}
                </a>
              </h3>
            </>
          ) : (
            <h3 className="subtitle is-3">Regras</h3>
          )}

          {regras ? (
            regras.length > 0 ? (
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Classificação</th>
                    <th>Tags</th>
                    <th>Pontuação</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {regras.map(regra => (
                    <tr key={regra.id}>
                      <Regra regra={regra} />
                      {this.props.auth.user.papel === "professor" && (
                        <td>
                          <span
                            style={{
                              marginRight: 20 + "px",
                              cursor: "pointer"
                            }}
                          >
                            <i
                              className="fas fa-edit"
                              onClick={this.toggleEditModal.bind(this, regra)}
                            />
                          </span>
                          <span
                            style={{
                              cursor: "pointer"
                            }}
                          >
                            <i
                              className="fas fa-trash"
                              onClick={this.props.deleteRegra.bind(this, regra)}
                            />
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table is-fullwidth">
                <h2>Não há regras cadastradas</h2>
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

const mapStateToProps = ({ regra, game, auth }) => ({ regra, game, auth });

export default connect(
  mapStateToProps,
  { getRegras, deleteRegra }
)(Regras);
