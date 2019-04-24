import React, { Component } from "react";

import Chart from "chart.js";

import { connect } from "react-redux";
import { getGame } from "../../store/actions/gameActions";

import axios from "../../services/api";

import Tarefas from "../../components/Tarefa/Tarefas";
import Regras from "../../components/Regra/Regras";

class Game extends Component {
  state = { disciplina: "" };

  async componentDidMount() {
    const { id: gameId } = this.props.match.params;

    await this.props.getGame(gameId);

    const {
      game: { ta_professor_disciplina_tb_disciplina_id: disciplinaId }
    } = this.props.game;

    const { data: disciplina } = await axios.get(`/disciplina/${disciplinaId}`);

    this.setState({
      ...this.state,
      disciplina
    });

    const ctx = document.querySelector("#ranking");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  render() {
    const { game } = this.props.game;
    return (
      <>
        <h1 className="title is-1">
          <span>
            <i className="fas fa-gamepad has-text-link" /> {game.nome}
          </span>
        </h1>
        <div className="columns is-multiline">
          <div className="column is-6">
            <div className="box">
              <p>Ranking aqui</p>
            </div>
          </div>
          <div className="column is-6">
            <div className="box">
              <canvas id="ranking" />
            </div>
          </div>
          <div className="column is-6">
            <Regras />
          </div>
          <div className="column is-6">
            <Tarefas />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  { getGame }
)(Game);
