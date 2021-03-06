import React, { Component } from "react";
import { connect } from "react-redux";

import { getGames } from "../../store/actions/gameActions";
import GameCard from "../../components/Game/GameCard";
import CriarGame from "../../components/Game/CriarGame";
import Spinner from "../layout/Spinner";

class Games extends Component {
  state = {
    createGame: false
  };

  createGame = () => {
    this.setState({
      ...this.state,
      createGame: !this.state.createGame
    });
  };

  componentWillReceiveProps(nextProps) {
    const { matricula } = this.props.auth.profile;
    if (matricula !== nextProps.auth.profile.matricula)
      this.props.getGames(nextProps.auth.profile.matricula);
  }

  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.getGames(matricula);
  }

  render() {
    const { games } = this.props.game;
    const { createGame } = this.state;
    const { papel } = this.props.auth.user;

    return (
      <>
        <div className="columns">
          <div className="column">
            <h1 className="title is-1">
              <span>
                <i className="fas fa-gamepad has-text-link" /> Games
              </span>
            </h1>
          </div>
          <div className="column">
            {papel === "professor" ? (
              <span>
                <button
                  onClick={this.createGame}
                  className="button is-rounded is-link is-pulled-right"
                >
                  Criar um game
                </button>
              </span>
            ) : null}
          </div>
        </div>
        {createGame ? <CriarGame toggle={this.createGame} /> : null}
        <div className="box">
          <h3 className="subtitle is-3">Seus games</h3>
          <hr />
          {games ? (
            games.length > 0 ? (
              <div className="columns is-multiline">
                {games.map(game => (
                  <div key={game.id} className="column is-2">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            ) : (
              <p>Não há nenhum game cadastrado</p>
            )
          ) : (
            <Spinner />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ game, auth }) => ({
  game,
  auth
});

export default connect(
  mapStateToProps,
  { getGames }
)(Games);
