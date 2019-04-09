import React from "react";
import Primeiro from "../../image/primeiro.png";


const Landing = () => {
  return (
    <div>


      <div class="box has-background-light">
        <div class="columns">
          <h1 class="is-size-3 column">Gameduc</h1>
        </div>
        <div class="columns">
          <p class="is-size-6 column">O que é?
            <br />
            <br />
            <p>Gameduc é uma plataforma para professores e alunos, em que alunos irão competir entre si para ser o melhor!</p>
          </p>

          <div class="column">
            <figure class='image is-5x3'><img src={Primeiro}></img></figure>
          </div>
        </div>
      </div>

    </div>
  )
}


export default Landing;