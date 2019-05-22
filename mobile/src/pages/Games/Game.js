import React, { useState } from "react";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { connect } from "react-redux";
import { Content } from "native-base";

import Ranking from "~/components/Game/Ranking";
import Alunos from "~/components/Game/Alunos";
import Regras from "~/components/Game/Regras";
import Tarefas from "~/components/Game/Tarefas";

import { getTarefas } from "~/store/actions/tarefaActions";
import { getRegras } from "~/store/actions/regraActions";
import { getAlunos, getRanking } from "~/store/actions/gameActions";

const Game = props => {
  const game = props.navigation.getParam("game", {});

  const [refreshing, setRefreshing] = useState(false);

  async function _onRefresh() {
    setRefreshing(true);
    props.getRanking(game.id);
    props.getAlunos(game.id);
    props.getRegras(game.id);
    props.getTarefas(game.id);
    setRefreshing(false);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
      }
    >
      <Content padder>
        <Ranking currentGame={game} />
        <Alunos currentGame={game} />
        <Regras currentGame={game} />
        <Tarefas currentGame={game} />
      </Content>
    </ScrollView>
  );
};

const mapStateToProps = ({ auth, game }) => ({ auth, game });

export default connect(
  mapStateToProps,
  { getTarefas, getRegras, getAlunos, getRanking }
)(Game);
