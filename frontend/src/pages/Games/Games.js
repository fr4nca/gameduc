import React, { Component } from "react";
import { connect } from "react-redux";

import { getGames } from "../../actions/gameActions";
import Game from "../../components/Game/Game";
import CriarGame from "../../components/Game/CriarGame";

class Games extends Component {
  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.getGames(matricula);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth !== nextProps.auth) {
      const { matricula } = nextProps.auth.profile;
      this.props.getGames(matricula);
    }
  }

  render() {
    const { games } = this.props.game;
    return (
      <div>
        <h1 className="title is-1">
          <span>
            <i className="fas fa-gamepad has-text-link" /> Games
          </span>
        </h1>
        <div className="box">
          <h3 className="subtitle is-3">Seus games</h3>
          <div className="columns is-multiline">
            {games.map(game => (
              <div className="column is-2">
                <div key={game.id}>
                  <Game game={game} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            <CriarGame />
          </div>
        </div>
      </div>
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
