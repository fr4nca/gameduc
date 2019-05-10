import React, { Component } from "react";
import Pontuacao from "./Pontuacao";
import Games from "./Games";
import Relatorio from "./Relatorio";

class PainelAluno extends Component {
  render() {
    return (
      <>
        <div className="columns is-multiline">
          <div className="column is-6">
            <Pontuacao />
          </div>

          <div className="column is-6">
            <Games />
          </div>

          <div className="column is-6">
            <Relatorio />
          </div>
        </div>
      </>
    );
  }
}

export default PainelAluno;
