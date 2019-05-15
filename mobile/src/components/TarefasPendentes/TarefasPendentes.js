import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import Icon from "react-native-vector-icons/FontAwesome";

import {
  getTarefasPendentes,
  validarTarefaPendente
} from "~/store/actions/tarefaActions";

import { relatorioProfessor } from "~/store/actions/gameActions";

import { Card, CardItem, Text, Body, List, ListItem } from "native-base";

const TarefasPendentes = props => {
  useEffect(() => {
    props.getTarefasPendentes(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const { tarefasPendentes: tarefas } = props.tarefa;

  return (
    <Card>
      <CardItem header>
        <Text>Tarefas pendentes</Text>
      </CardItem>
      <CardItem>
        <Body>
          <List>
            {tarefas ? (
              tarefas.length > 0 ? (
                tarefas.map(tarefa => (
                  <ListItem key={tarefa.id}>
                    <Text>{tarefa.descricao} </Text>
                    <Icon
                      onPress={() => {
                        props.validarTarefaPendente(tarefa);
                        props.getTarefasPendentes(props.auth.profile.matricula);
                        props.relatorioProfessor(props.auth.profile.matricula);
                      }}
                      name="check"
                      size={20}
                      color="#4F8EF7"
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <Text>Nenhuma tarefa pendente</Text>
                </ListItem>
              )
            ) : (
              <ActivityIndicator />
            )}
          </List>
        </Body>
      </CardItem>
    </Card>
  );
};

const mapStateToProps = ({ auth, tarefa }) => ({ auth, tarefa });

export default connect(
  mapStateToProps,
  { getTarefasPendentes, validarTarefaPendente, relatorioProfessor }
)(TarefasPendentes);
