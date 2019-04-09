import React, { useState, useEffect } from "react";
import moment from "moment";

const Game = ({ game }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // let time = moment.utc(game.dta_fim).local();
    // let dataFim = time.format("DD/MM/YYYY HH:mm:ss");
    // let dia2 = new Date(dataFim);
    // console.log(dia2);
    // let today = new Date();
    // let perc = (today * 100) / dia2;

    // setPercent(perc);
    console.log(moment(game.dta_fim));
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
