import React from "react";

import Games from "./Games";
import Tarefas from "./Tarefas";
import Relatorio from "./Relatorio";

const PainelProfessor = () => {
  return (
    <>
      <div className="columns is-multiline">
        <div className="column is-6">
          <Tarefas />
        </div>

        <div className="column is-6">
          <Relatorio />
        </div>

        <div className="column is-6">
          <Games />
        </div>
      </div>
    </>
  );
};

export default PainelProfessor;
