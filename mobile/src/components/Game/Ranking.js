import React, { useEffect } from "react";

import { ActivityIndicator } from "react-native";

import { Card, CardItem, Text, Right, Left } from "native-base";

import { connect } from "react-redux";
import { getRanking } from "~/store/actions/gameActions";

const Ranking = props => {
  useEffect(() => {
    props.getRanking(props.currentGame.id);
  }, []);

  const { ranking } = props.game;
  let posicao = 0;

  return (
    <Card>
      <CardItem header bordered>
        <Text>Ranking</Text>
      </CardItem>
      <CardItem bordered>
        <Left>
          <Text style={{ fontWeight: "bold" }}>Posição</Text>
        </Left>
        <Left>
          <Text style={{ fontWeight: "bold" }}>Aluno</Text>
        </Left>
        <Right>
          <Text style={{ fontWeight: "bold" }}>Pontuação</Text>
        </Right>
      </CardItem>
      {ranking ? (
        ranking.length > 0 ? (
          ranking.map(aluno => {
            posicao++;
            return (
              <CardItem bordered key={aluno.matricula}>
                <Left>
                  <Text>{posicao}º</Text>
                </Left>
                <Left>
                  <Text>{aluno.nome}</Text>
                </Left>
                <Right>
                  <Text>{aluno.soma}</Text>
                </Right>
              </CardItem>
            );
          })
        ) : (
          <CardItem>
            <Text>Nenhum aluno pontuou</Text>
          </CardItem>
        )
      ) : (
        <CardItem>
          <ActivityIndicator />
        </CardItem>
      )}
    </Card>
  );
};

const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  { getRanking }
)(Ranking);
