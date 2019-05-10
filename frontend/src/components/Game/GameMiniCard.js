import React, { Component } from "react";
import { Link } from "react-router-dom";

class GameMiniCard extends Component {
  state = {
    percent: ""
  };

  async componentDidMount() {
    const { game } = this.props;

    let fim = new Date(game.dta_fim).getTime() / 1000;
    let inicio = new Date(game.dta_inicio).getTime() / 1000;
    let hoje = new Date().getTime() / 1000;

    let percent = Math.round(((hoje - inicio) / (fim - inicio)) * 100);

    this.setState({
      ...this.state,
      percent
    });
  }

  render() {
    const { percent } = this.state;
    const { game } = this.props;

    return (
      <li className="box">
        {game.nome}
        <Link to={`/dashboard/game/${game.id}`}>
          <i className="is-pulled-right fas fa-arrow-circle-right has-text-link" />
        </Link>
        <progress
          className="progress is-link"
          value={percent >= 100 ? 100 : percent <= 0 ? 0 : percent}
          max="100"
          style={{ display: "inline-block" }}
        />
      </li>
    );
  }
}

export default GameMiniCard;
