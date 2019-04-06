import React from "react";

import moment from "moment";

const getDiffDays = (date1, date2) => {
  let dia1 = new Date(date1).getTime() / 1000;
  let dia2 = new Date(date2).getTime() / 1000;
  let today = new Date().getTime() / 1000;

  let perc = (today * 100) / dia2;
  console.log(today, dia1, dia2, perc);

  return perc;
};

const Game = ({ game }) => {
  const times = getDiffDays(game.dta_inicio, game.dta_fim);
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
      </div>
      <progress class="progress is-link" value="30" max="100">
        {times.perc}
      </progress>
      <footer className="card-footer">
        <a href="#!" className="card-footer-item">
          Visitar
        </a>
      </footer>
    </div>
  );
};
export default Game;
