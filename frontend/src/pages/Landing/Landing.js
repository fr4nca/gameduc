import React from "react";
import Primeiro from "../../static/img/primeiro.png";
import Segundo from "../../static/img/segundo.png";
import Terceiro from "../../static/img/terceiro.png";

import { connect } from "react-redux";

const Landing = props => {
  return (
    <div>
      <div class="has-background-light">
        {/* Primeira linha com o titulo Gameduc */}
        <div class="columns">
          <div class="column">
            <p className="is-size-3 has-text-centered">Gameduc</p>
          </div>
        </div>
        {/* Segunda linha com explicação do que é + imagem*/}
        <div style={{ backgroundColor: "#eeeeee" }}>
          <div className="container p-2">
            <div class="columns">
              <p class="is-size-5 column is-three-quarters">
                O que é?
                <br />
                <br />
                <p class="is-size-6">
                  Gameduc é uma plataforma para professores e alunos, em que
                  alunos irão pontuar para competir e contabilizar seu pontos
                  durante o decorrer do jogo criado pelo professor.
                </p>
              </p>
              <div class="column">
                <figure class="image has-image-centered is-128x128">
                  <img src={Primeiro} alt="Jogo" />
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* Terceira linha com detalhamento de como funciona + imagem */}
        <div style={{ backgroundColor: "#ffffff" }}>
          <div className="container p-2">
            <div class="columns">
              <div class="column is-one-fifth">
                <figure class="image has-image-centered is-128x128">
                  <img src={Segundo} alt="Jogo" />
                </figure>
              </div>
              <p class="is-size-5 column">
                Como funciona?
                <br />
                <br />
                <p class="is-size-6">
                  Professor: Cadastra as disciplinas que dá aula e depois pode
                  cadastrar jogos em cada disciplina de acordo com a
                  necessidade.
                  <br /> Para cada tarefa da matéria que o professor achar
                  necessário pontuar, criará uma regra no jogo.
                  <br /> Existem uma ou várias tarefas que podem ser pontuadas
                  pela mesma regra, vai de acordo com o plano do educador.
                </p>
                <br />
                <p class="is-size-6">
                  Aluno: Acessa os jogos de cada disciplina. Pode cadastrar
                  tarefas concluídas nos jogos disponibilizados pelo
                  professor,mas estas devem ser validadas por ele, e acompanhar
                  seu progresso em cada matéria e em um ranking geral.
                </p>
              </p>
            </div>
          </div>
        </div>

        {/*Quarta linha  apresentando mais dados*/}
        <div style={{ backgroundColor: "#eeeeee" }}>
          <div className="container p-2">
            <div class="columns">
              <p class="column is-size-5 is-three-quarters">
                Quais os critérios para avaliação?
                <br />
                <br />
                <p class="is-size-6">
                  Não há critérios definidos!
                  <br />
                  Gameduc é somente uma plataforma que permite o cadastro de
                  tarefas concluídas para serem pontuadas, e todos os critérios
                  são definidos de acordo com o educador.
                  <br />
                  Pode ser a entrega de um papel, completar um projeto ou
                  plantar uma árvore. Qualquer atividade que o educador definir
                  e classificar nos jogos vale.
                </p>
              </p>
              <div class="column">
                <figure class="image has-image-centered is-128x128">
                  <img src={Terceiro} alt="Jogo" />
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* Quinta linha com botão de cadastro */}
        <div style={{ backgroundColor: "#ffffff" }}>
          <div className="container p-2">
            <div class="columns">
              <p class="column is-size-4 " style={{ textAlign: "center" }}>
                Participe também!
                <br />
                <br />
                {props.auth.isAuthenticated ? (
                  <a class="button is-link" href="/dashboard">
                    Painel
                  </a>
                ) : (
                  <a class="button is-link" href="/register">
                    Registrar
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Landing);
