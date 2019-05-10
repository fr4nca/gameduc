import React, { Component } from "react";
import Chart from "chart.js";

import { connect } from "react-redux";

export class Grafico extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.game.ranking !== nextProps.game.ranking) {
      this.iniciaGrafico(nextProps.game.ranking);
    }
  }

  iniciaGrafico(ranking) {
    if (ranking) {
      const nomes = ranking.map(aluno => aluno.nome);
      const pontos = ranking.map(aluno => aluno.soma);

      const ctx = document.querySelector("#ranking");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: nomes,
          datasets: [
            {
              label: "Pontuação",
              data: pontos,
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
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="box">
        <canvas id="ranking" />
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  {}
)(Grafico);
