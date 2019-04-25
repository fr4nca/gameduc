import React from "react";
import Primeiro from "../../image/primeiro.png";
import Segundo from "../../image/segundo.png";
import Terceiro from "../../image/terceiro.png";


const Landing = () => {
  return (
    <div>


      <div class="box has-background-light">

        {/* Primeira linha com o titulo Gameduc */}
        <div class="columns">
          <div class="column" >
            <p class="is-size-3" style={{ textAlign: 'center' }}>Gameduc</p>
          </div>
        </div>
        {/* Segunda linha com explicação do que é + imagem*/}
        <div class="columns" style={{ backgroundColor: '#eeeeee' }}>
          <p class="is-size-5 column  is-three-quarters">O que é?
            <br />
            <br />
            <p class="is-size-6">Gameduc é uma plataforma para professores e alunos,
               em que alunos irão pontuar para competir e contabilizar
                seu pontos durante o decorrer do jogo criado pelo jogo.</p>
          </p>
          <div class="column">
            <figure class='image has-image-centered is-128x128'>
              <img src={Primeiro} alt="Jogo" /> </figure>
          </div>
        </div>

        {/* Terceira linha com detalhamento de como funciona + imagem */}
        <div class="columns" style={{ backgroundColor: '#ffffff' }} >
          <div class="column is-one-fifth">
            <figure class='image has-image-centered is-128x128'>
              <img src={Segundo} alt="Jogo" /></figure>
          </div>
          <p class="is-size-5 column">Como funciona?
            <br />
            <br />
            <p class="is-size-6">Professor: Cadastra as disciplinas que dá aula e depois pode cadastrar jogos em cada disciplina de acordo com a necessidade.
            <br /> Cada jogo tem suas regras definidas pelo professor como pontuação, tempo para completar e requisitos.
            <br /> O educador também deve aceitar ou não os jogos realizados pelos alunos, concedendo a pontuação.
             </p>
            <br />
            <p class="is-size-6">Aluno: Acessa suas disciplinas e os jogos de cada uma. Pode marcar como completo nos jogos disponibilizados pelo professor e acompanhar seu progresso em cada matéria e em um ranking geral. </p>
          </p>
        </div>

        {/*Quarta linha  apresentando mais dados*/}
        <div class="columns" style={{ backgroundColor: '#eeeeee' }} >
          <p class="column is-size-5 is-three-quarters">
            Quais os critérios para avaliação?
            <br />
            <br />
            <p class="is-size-6">
              Não há critérios definidos!
            <br />
              Gameduc é somente uma plataforma que permite o cadastro de atividades, e todos os critérios são definidos de acordo com o educador.
            <br />
              Pode ser a entrega de um papel, completar um projeto ou plantar uma árvore. Qualquer atividade que o educador definir e classificar nos jogos vale.
            </p>
          </p>
          <div class="column">
            <figure class='image has-image-centered is-128x128'>
              <img src={Terceiro} alt="Jogo" /></figure>
          </div>
        </div>

        {/* Quinta linha com botão de cadastro */}
        <div class="columns" style={{ backgroundColor: '#eeeeee' }} >
          <p class="column is-size-4 " style={{ textAlign: 'center' }}>
            Participe também!
            <br />
            <br />
            <a class="button is-primary">Registrar</a>
          </p>


        </div>

      </div>
    </div>
  )
}


export default Landing;