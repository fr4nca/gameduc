import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import { relatorioAluno } from "~/store/actions/gameActions";

import { Card, CardItem, Text, Left, Right } from "native-base";

const RelatorioAluno = props => {
  useEffect(() => {
    props.relatorioAluno(props.auth.profile.matricula);
  }, []);

  const { relatorio } = props.game;

  return (
    <Card>
      <CardItem header bordered>
        <Text>Relatório</Text>
      </CardItem>
      <CardItem bordered>
        <Left>
          <Text style={{ fontWeight: "bold" }}>Nome do game</Text>
        </Left>
        <Left>
          <Text style={{ fontWeight: "bold" }}>Tarefas validadas</Text>
        </Left>
        <Right>
          <Text style={{ fontWeight: "bold" }}>Pontuação</Text>
        </Right>
      </CardItem>
      {relatorio ? (
        relatorio.length > 0 ? (
          relatorio.map(relatorio => (
            <CardItem key={relatorio.nome}>
              <Left>
                <Text>{relatorio.nome}</Text>
              </Left>
              <Left>
                <Text>{relatorio.tarefas}</Text>
              </Left>
              <Right>
                <Text>{relatorio.pontuacao}</Text>
              </Right>
            </CardItem>
          ))
        ) : (
          <CardItem>
            <Text>Você ainda não faz parte de nenhum game</Text>
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

const mapStateToProps = ({ auth, game }) => ({ auth, game });

export default connect(
  mapStateToProps,
  { relatorioAluno }
)(RelatorioAluno);
