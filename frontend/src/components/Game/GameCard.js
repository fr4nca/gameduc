import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "../../config/api";

import moment from "moment";

class GameCard extends Component {
  state = {
    percent: "",
    disciplina: ""
  };

  async componentDidMount() {
    const {
      game,
      game: { ta_professor_disciplina_tb_disciplina_id: disciplinaId }
    } = this.props;

    const { data: disciplina } = await axios.get(`/disciplina/${disciplinaId}`);

    let fim = new Date(game.dta_fim).getTime() / 1000;
    let inicio = new Date(game.dta_inicio).getTime() / 1000;
    let hoje = new Date().getTime() / 1000;

    let percent = Math.round(((hoje - inicio) / (fim - inicio)) * 100);

    this.setState({
      ...this.state,
      percent,
      disciplina
    });
  }

  render() {
    const { percent, disciplina } = this.state;
    const { game } = this.props;

    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{game.nome}</p>
        </header>
        <div className="card-content">
          <div className="content">
            <p>
              <strong>Disciplina:</strong> {disciplina.nome}
            </p>
            <p>
              <strong>Início:</strong>{" "}
              {moment(game.dta_inicio).format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Finalização:</strong>{" "}
              {moment(game.dta_fim).format("DD/MM/YYYY")}
            </p>
          </div>
          <progress
            className="progress is-link"
            value={percent >= 100 ? 100 : percent}
            max="100"
          />
          {percent >= 100 ? "Finalizado" : percent + "% completo"}
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
