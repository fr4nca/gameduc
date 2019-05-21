import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Card, CardItem, Text, Body } from "native-base";

import { connect } from "react-redux";
import { pontuacao } from "~/store/actions/gameActions";

const Pontuacao = props => {
  useEffect(() => {
    props.pontuacao(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const { pontuacao } = props.game;

  return (
    <Card>
      <CardItem header bordered>
        <Text>Pontuação</Text>
      </CardItem>
      <CardItem>
        <Body>
          {pontuacao ? (
            pontuacao.length > 0 ? (
              <Text>
                Sua pontuação geral é de {pontuacao[0].pontuacao} pontos em{" "}
                {pontuacao[0].tarefas} tarefas validadas de {pontuacao[1].games}{" "}
                jogos. Você ainda possui {pontuacao[2].tarefasNaoValidadas}{" "}
                tarefa
                {pontuacao[2].tarefasNaoValidadas > 1 ? "s" : null} pendente
                {pontuacao[2].tarefasNaoValidadas > 1 ? "s" : null} de validação
              </Text>
            ) : (
              <Text>Não há games ativos</Text>
            )
          ) : (
            <CardItem>
              <ActivityIndicator />
            </CardItem>
          )}
        </Body>
      </CardItem>
    </Card>
  );
};

const mapStateToProps = ({ auth, game }) => ({ auth, game });

export default connect(
  mapStateToProps,
  { pontuacao }
)(Pontuacao);
