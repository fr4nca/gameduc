import React, { Component } from "react";
import GameMiniCard from "../Game/GameMiniCard";
import Spinner from "../../pages/layout/Spinner";

import { connect } from "react-redux";

import { getGamesAtivos } from "../../store/actions/gameActions";

export class Games extends Component {
  componentWillReceiveProps(nextProps) {
    const { matricula } = this.props.auth.profile;
    if (matricula !== nextProps.auth.profile.matricula)
      this.props.getGamesAtivos(nextProps.auth.profile.matricula);
  }

  componentDidMount() {
    const { matricula } = this.props.auth.profile;
    this.props.getGamesAtivos(matricula);
  }

  render() {
    const { gamesAtivos: games } = this.props.game;

    return (
      <div className="box">
        <h3 className="subtitle is-3">Games ativos</h3>
        <hr />
        <ul>
          {games ? (
            games.length >= 1 ? (
              games.map(game => <GameMiniCard key={game.id} game={game} />)
            ) : (
              <p>Não há games ativos</p>
            )
          ) : (
            <Spinner />
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, game }) => ({ auth, game });

export default connect(
  mapStateToProps,
  { getGamesAtivos }
)(Games);
