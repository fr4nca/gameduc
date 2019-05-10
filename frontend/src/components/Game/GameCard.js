import React, { Component } from "react";
import { Link } from "react-router-dom";

import moment from "moment";

class GameCard extends Component {
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
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{game.nome}</p>
        </header>
        <div className="card-content">
          <div className="content">
            <p>
              <strong>Início:</strong>{" "}
              {moment.utc(game.dta_inicio).format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Finalização:</strong>{" "}
              {moment.utc(game.dta_fim).format("DD/MM/YYYY")}
            </p>
          </div>
          <progress
            className="progress is-link"
            value={percent >= 100 ? 100 : percent <= 0 ? 0 : percent}
            max="100"
          />
          {percent >= 100
            ? "Finalizado"
            : percent <= 0
            ? "Game ainda não começou"
            : percent + "% completo"}
        </div>
        <footer className="card-footer">
          <Link to={`/dashboard/game/${game.id}`} className="card-footer-item">
            Visitar
          </Link>
        </footer>
      </div>
    );
  }
}

export default GameCard;
