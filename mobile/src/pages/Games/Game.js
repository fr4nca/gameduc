import React from "react";
import { ScrollView } from "react-native-gesture-handler";

import { connect } from "react-redux";
import Ranking from "~/components/Game/Ranking";
import { Content } from "native-base";
import Alunos from "~/components/Game/Alunos";
import Regras from "~/components/Game/Regras";
import Tarefas from "~/components/Game/Tarefas";

const Game = props => {
  const game = props.navigation.getParam("game", {});

  return (
    <ScrollView>
      <Content padder>
        <Ranking currentGame={game} />
        <Alunos currentGame={game} />
        <Regras currentGame={game} />
        <Tarefas currentGame={game} />
      </Content>
    </ScrollView>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Game);
