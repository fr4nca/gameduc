import React from "react";

const Game = ({ game }) => {
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
          <p>
            <strong>Disciplina: </strong>
          </p>
        </div>
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
