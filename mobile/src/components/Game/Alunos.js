import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { Card, CardItem, Text, Left, Right } from "native-base";

import { connect } from "react-redux";
import { getAlunos } from "~/store/actions/gameActions";

const Alunos = props => {
  useEffect(() => {
    props.getAlunos(props.currentGame.id);
  }, []);

  const { alunos } = props.game;

  return (
    <Card>
      <CardItem header bordered>
        <Text>Alunos</Text>
      </CardItem>
      <CardItem bordered>
        <Left>
          <Text style={{ fontWeight: "bold" }}>Nome</Text>
        </Left>
        <Right>
          <Text style={{ fontWeight: "bold" }}>Matrícula</Text>
        </Right>
      </CardItem>
      {alunos ? (
        alunos.length > 0 ? (
          alunos.map(aluno => {
            return (
              <CardItem key={aluno.matricula}>
                <Left>
                  <Text>{aluno.nome}</Text>
                </Left>
                <Right>
                  <Text>{aluno.matricula}</Text>
                </Right>
              </CardItem>
            );
          })
        ) : (
          <CardItem>
            <Text>Nenhum aluno</Text>
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

const mapStateToProps = ({ game, auth }) => ({ game, auth });

export default connect(
  mapStateToProps,
  { getAlunos }
)(Alunos);
