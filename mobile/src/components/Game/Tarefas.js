import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { Card, CardItem, Text, Left, Right } from "native-base";

import { connect } from "react-redux";
import { getTarefas } from "~/store/actions/tarefaActions";

const Tarefas = props => {
  useEffect(() => {
    props.getTarefas(props.currentGame.id);
  }, []);

  const { tarefas } = props.tarefa;

  return (
    <Card>
      <CardItem header bordered>
        <Text>Tarefas</Text>
      </CardItem>
      <CardItem bordered>
        <Left>
          <Text style={{ fontWeight: "bold" }}>Descrição</Text>
        </Left>
        <Left>
          <Text style={{ fontWeight: "bold" }}>Classificação</Text>
        </Left>
        <Right>
          <Text style={{ fontWeight: "bold" }}>Tag</Text>
        </Right>
      </CardItem>
      {tarefas ? (
        tarefas.length > 0 ? (
          tarefas.map(tarefa => {
            return (
              <CardItem key={tarefa.id}>
                <Left>
                  <Text>{tarefa.descricao}</Text>
                </Left>
                <Left>
                  <Text>{tarefa.classificacao}</Text>
                </Left>
                <Right>
                  <Text>{tarefa.tag}</Text>
                </Right>
              </CardItem>
            );
          })
        ) : (
          <CardItem>
            <Text>Nenhuma tarefa cadastrada</Text>
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

const mapStateToProps = ({ tarefa, auth }) => ({ tarefa, auth });

export default connect(
  mapStateToProps,
  { getTarefas }
)(Tarefas);
