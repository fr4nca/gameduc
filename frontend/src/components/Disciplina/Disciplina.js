import React, { Component } from "react";

export class Disciplina extends Component {
  render() {
    const { disciplina } = this.props;
    return (
      <div>
        <h1>{disciplina.nome}</h1>
      </div>
    );
  }
}

export default Disciplina;
