import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import { relatorioProfessor } from "~/store/actions/gameActions";

import { Card, CardItem, Text } from "native-base";

const RelatorioProfessor = props => {
  useEffect(() => {
    props.relatorioProfessor(props.auth.profile.matricula);
    //TODO: Get right relatorio deppending on papel
  }, [props.auth.profile.matricula]);

  const { relatorio } = props.game;

  return (
    <Card>
      <CardItem header bordered>
        <Text>Relatório</Text>
      </CardItem>
      {relatorio ? (
        Object.keys(relatorio).length > 0 ? (
          <>
            <CardItem>
              <Text>{relatorio.games} games ativos</Text>
            </CardItem>
            <CardItem>
              <Text>{relatorio.alunos} alunos nos seus games</Text>
            </CardItem>
            <CardItem>
              <Text>{relatorio.disciplinas} disciplinas vinculadas</Text>
            </CardItem>
            <CardItem>
              <Text>{relatorio.tarefas} tarefas validadas</Text>
            </CardItem>
          </>
        ) : (
          <>
            <CardItem>
              <Text>0 games ativos</Text>
            </CardItem>
            <CardItem>
              <Text>0 alunos nos seus games</Text>
            </CardItem>
            <CardItem>
              <Text>0 disciplinas vinculadas</Text>
            </CardItem>
            <CardItem>
              <Text>0 tarefas validadas</Text>
            </CardItem>
          </>
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
  { relatorioProfessor }
)(RelatorioProfessor);
