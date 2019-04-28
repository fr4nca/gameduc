import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlunos, deleteAluno } from "../../store/actions/gameActions";
import AdicionarAluno from "./AdicionarAluno";

class Alunos extends Component {
  componentDidMount() {
    this.props.getAlunos(this.props.game.game.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.game.game !== nextProps.game.game)
      this.props.getAlunos(nextProps.game.game.id);
  }

  state = {
    adicionarAluno: false
  };

  toggleAddModal = () => {
    this.setState({
      ...this.state,
      adicionarAluno: !this.state.adicionarAluno
    });
  };

  render() {
    const { alunos } = this.props.game;
    return (
      <div>
        <div className="box">
          {this.props.auth.user.papel === "professor" ? (
            <>
              <h3 className="subtitle is-3 is-pulled-left">Alunos</h3>
              <h3 className="subtitle is-3 is-pulled-right">
                <a href="#!">
                  <i className="fas fa-plus" onClick={this.toggleAddModal} />
                  {this.state.adicionarAluno && (
                    <AdicionarAluno toggleAddModal={this.toggleAddModal} />
                  )}
                </a>
              </h3>
            </>
          ) : (
            <h3 className="subtitle is-3">Alunos</h3>
          )}

          {alunos.length > 0 ? (
            <table className="table is-fullwidth">
              <ul className="list">
                {alunos.map(aluno => (
                  <li key={aluno.matricula} className="list-item">
                    {aluno.nome}
                    <i
                      style={{ cursor: "pointer" }}
                      className="fas fa-trash is-pulled-right is-vcentered"
                      onClick={this.props.deleteAluno.bind(
                        this,
                        aluno.matricula,
                        this.props.game.game.id
                      )}
                    />
                  </li>
                ))}
              </ul>
            </table>
          ) : (
            <table className="table is-fullwidth">
              <h2>Nenhum aluno cadastrado no game</h2>
            </table>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game, auth }) => ({ game, auth });

export default connect(
  mapStateToProps,
  { getAlunos, deleteAluno }
)(Alunos);
