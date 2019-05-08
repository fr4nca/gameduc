import React, { Component } from "react";

import { connect } from "react-redux";
import moment from "moment";
export class Perfil extends Component {
  render() {
    const { profile, user} = this.props.auth;

    return (
      <>
        <div className="columns">
          <div className="column">
            <h1 className="title is-1">
              <span>
                <i className="fas fa-id-card has-text-link" /> Perfil
              </span>
            </h1>
          </div>
          <div className="column">
            <span>
              <button className="button is-rounded is-link is-pulled-right">
                Editar Perfil
              </button>
            </span>
          </div>
        </div>
        <div className="box">
          <h3 className="subtitle is-3">Seus dados</h3>
          <hr />
          <strong>Matricula: </strong>{profile.matricula}
          <hr />
          <strong>Nome: </strong>
          {profile.nome} {profile.sobrenome}
          <hr />
          <strong>Data de nascimento: </strong>
          {moment(profile.dta_nascimento).format("DD/MM/YYYY")}
          <hr />
          { user.papel === 'professor' ? (<div>
            <strong>Graduação: </strong>{profile.graduacao}
            </div>
          ):(<div>
            <strong>Curso: </strong>{profile.curso}
            </div>)}
          <hr />
          <strong>Email: </strong>newthayprofessor@professor.com
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Perfil);
