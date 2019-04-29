import React, { Component } from "react";

export class Perfil extends Component {
  render() {
    return (
      <>
      <div className="columns">
        <div className="column"> 
        <h1 className="title is-1">
          <span>
            <i className="fas fa-id-badge has-text-link" /> / <i className="fas fa-id-card has-text-link" />  Perfil
          </span>
        </h1>
        </div>
        <div className="column"> 
          <span>
            <button
              className="button is-rounded is-link is-pulled-right"
            >
              Editar Perfil
            </button>
          </span>
        </div>
        </div>
        <div className="box">
          <h3 className="subtitle is-3">Seus dados</h3>
          <hr />
          <strong>Nome: </strong>Thaynara Ronan Victor
          <hr />
          <strong>Data de nascimento: </strong>14/02/2016  
          <hr />
          <strong>Graduação: </strong>Ciência da Computação
          <hr />
          <strong>Email: </strong>newthayprofessor@professor.com 
        </div>
        
        <span>
          <button
            className="button is-rounded is-link is-pulled-right"
          >
            Editar Perfil
          </button>
        </span>
      </>
    );
  }
}

export default Perfil;
