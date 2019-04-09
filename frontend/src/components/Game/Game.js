import React, { useState, useEffect } from "react";
import moment from "moment";

const Game = ({ game }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let fim = new Date(game.dta_fim).getTime() / 1000;
    let inicio = new Date(game.dta_inicio).getTime() / 1000;
    let hoje = new Date().getTime() / 1000;

    let perc = Math.round(((hoje - inicio) / (fim - inicio)) * 100);

    game.dta_inicio = moment(game.dta_inicio).format("DD/MM/YYYY");
    game.dta_fim = moment(game.dta_fim).format("DD/MM/YYYY");
    setPercent(perc);
  }, {});

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{game.nome}</p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>
            <strong>Data de início:</strong> {game.dta_inicio}
          </p>
          <p>
            <strong>Data de finalização:</strong> {game.dta_fim}
          </p>
        </div>
        <progress className="progress is-link" value={percent} max="100" />
        {percent >= 100 ? 100 + "%" : percent + "%"}
      </div>
      <footer className="card-footer">
        <a href="#!" className="card-footer-item">
          Visitar
        </a>
      </footer>
    </div>
  );
};
export default Game;
