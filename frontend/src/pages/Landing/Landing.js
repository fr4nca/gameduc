import React from "react";
import Primeiro from "../../image/primeiro.png";
import Segundo from "../../image/segundo.png";


const Landing = () => {
  return (
    <div>


      <div class="box has-background-light">

        {/* Primeira linha com o titulo Gameduc */}
        <div class="columns">
          <h1 class="is-size-3 column">Gameduc</h1>
        </div>
        {/* Segunda linha com explicação do que é + imagem*/}
        <div class="columns">
          <p class="is-size-5 column  is-three-quarters">O que é?
            <br />
            <br />
            <p class="is-size-6">Gameduc é uma plataforma para professores e alunos,
               em que alunos irão pontuar para competir e contabilizar
                seu pontos durante o decorrer do jogo criado pelo jogo.</p>
          </p>

          <div class="column">
            <figure class='image is-128x128'>
              <img src={Primeiro} /></figure>
          </div>
        </div>

        {/* Terceira linha com detalhamento de como funciona + imagem */}
        <div class="columns">

          <div class="column is-one-fifth">
            <figure class='image has-image-centered is-128x128'>
              <img src={Segundo} /></figure>
          </div>
          <p class="is-size-5 column">Como funciona?
            <br />
            <br />
            <p class="is-size-6">Professor: Cadastra as disciplinas que dá aula e depois pode cadastrar jogos em cada disciplina de acordo com a necessidade.
            <br /> Cada jogo tem suas regras definidas pelo professor como pontuação, tempo para completar e requisitos.
            <br /> O educador também deve aceitar ou não os jogos realizados pelos alunos, concedendo a pontuação.
             </p>
            <br />
            <p class="is-size-6">Aluno:</p>
          </p>


        </div>

      </div>

    </div>
  )
}


export default Landing;