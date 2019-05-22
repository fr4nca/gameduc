import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import Icon from "react-native-vector-icons/FontAwesome";

import {
  getTarefasPendentes,
  validarTarefaPendente
} from "~/store/actions/tarefaActions";

import { relatorioProfessor } from "~/store/actions/gameActions";

import { Card, CardItem, Text, Right, Left, Button } from "native-base";

const TarefasPendentes = props => {
  useEffect(() => {
    props.getTarefasPendentes(props.auth.profile.matricula);
  }, []);

  const { tarefasPendentes: tarefas } = props.tarefa;

  return (
    <Card>
      <CardItem header bordered>
        <Text>Tarefas pendentes</Text>
      </CardItem>
      {tarefas ? (
        tarefas.length > 0 ? (
          tarefas.map(tarefa => (
            <CardItem key={tarefa.id} bordered>
              <Left>
                <Text>{tarefa.descricao}</Text>
              </Left>
              <Right>
                <Button
                  transparent
                  onPress={() => {
                    props.validarTarefaPendente(tarefa);
                    props.getTarefasPendentes(props.auth.profile.matricula);
                    props.relatorioProfessor(props.auth.profile.matricula);
                  }}
                >
                  <Icon name="check" size={20} color="#4F8EF7" />
                </Button>
              </Right>
            </CardItem>
          ))
        ) : (
          <CardItem>
            <Text>Nenhuma tarefa pendente</Text>
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

const mapStateToProps = ({ auth, tarefa }) => ({ auth, tarefa });

export default connect(
  mapStateToProps,
  { getTarefasPendentes, validarTarefaPendente, relatorioProfessor }
)(TarefasPendentes);
