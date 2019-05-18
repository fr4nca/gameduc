import React from "react";
import { ScrollView } from "react-native-gesture-handler";

import { connect } from "react-redux";
import Ranking from "~/components/Game/Ranking";
import { Content } from "native-base";

const Game = props => {
  const game = props.navigation.getParam("game", {});

  return (
    <ScrollView>
      <Content padder>
        <Ranking currentGame={game} />
      </Content>
    </ScrollView>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Game);
