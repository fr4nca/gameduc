import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import { relatorioProfessor } from "~/store/actions/gameActions";

import { Card, CardItem, Text, Body, List, ListItem, Right } from "native-base";

const RelatorioProfessor = props => {
  useEffect(() => {
    props.relatorioProfessor(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const { relatorio } = props.game;

  return (
    <Card>
      <CardItem header>
        <Text>Relatório</Text>
      </CardItem>
      <CardItem>
        <Body>
          {relatorio ? (
            Object.keys(relatorio).length > 0 ? (
              <List>
                <ListItem>
                  <Text>{relatorio.games} games ativos</Text>
                </ListItem>
                <ListItem>
                  <Text>{relatorio.alunos} alunos nos seus games</Text>
                </ListItem>
                <ListItem>
                  <Text>{relatorio.disciplinas} disciplinas vinculadas</Text>
                </ListItem>
                <ListItem>
                  <Text>{relatorio.tarefas} tarefas validadas</Text>
                </ListItem>
              </List>
            ) : (
              <List>
                <ListItem>
                  <Text>0 games ativos</Text>
                </ListItem>
                <ListItem>
                  <Text>0 alunos nos seus games</Text>
                </ListItem>
                <ListItem>
                  <Text>0 disciplinas vinculadas</Text>
                </ListItem>
                <ListItem>
                  <Text>0 tarefas validadas</Text>
                </ListItem>
              </List>
            )
          ) : (
            <ActivityIndicator />
          )}
        </Body>
      </CardItem>
    </Card>
  );
};

const mapStateToProps = ({ auth, game }) => ({ auth, game });

export default connect(
  mapStateToProps,
  { relatorioProfessor }
)(RelatorioProfessor);
