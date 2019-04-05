import React, { Component } from "react";

export class Disciplina extends Component {
  render() {
    const { disciplina } = this.props;
    return (
      <div>
        <p>
          {disciplina.nome}
          <span
            onClick={() => {}}
            style={{ cursor: "pointer" }}
            className="icon has-text-info"
          >
            <i className="fas fa-arrow-right is-pulled-right" />
          </span>
        </p>
      </div>
    );
  }
}

export default Disciplina;
