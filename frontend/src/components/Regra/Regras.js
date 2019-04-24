import React, { Component } from "react";

import { connect } from "react-redux";

import { getRegras, deleteRegra } from "../../store/actions/regraActions";

import Regra from "./Regra";
import AdicionarRegra from "./AdicionarRegra";
import EditarRegra from "./EditarRegra";

class Regras extends Component {
  state = {
    adicionarRegra: false,
    editarRegra: false,
    regra: null
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
          {this.props.auth.user.papel === "professor" ? (
            <>
              <h3 className="subtitle is-3 is-pulled-left">Regras</h3>
              <h3 className="subtitle is-3 is-pulled-right">
                <a href="#!">
                  <i className="fas fa-plus" onClick={this.toggleAddModal} />
                  {this.state.adicionarRegra && (
                    <AdicionarRegra toggleAddModal={this.toggleAddModal} />
                  )}
                </a>
              </h3>
            </>
          ) : (
            <h3 className="subtitle is-3">Regras</h3>
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
                        <span
                          style={{ marginRight: 20 + "px", cursor: "pointer" }}
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
                            onClick={this.props.deleteRegra.bind(
                              this,
                              regra.id
                            )}
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
