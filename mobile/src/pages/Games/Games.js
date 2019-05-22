import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { connect } from "react-redux";
import { getGames } from "../../store/actions/gameActions";
import GameCard from "./GameCard";
import { Content, Text } from "native-base";

const Games = props => {
  useEffect(() => {
    props.getGames(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const [refreshing, setRefreshing] = useState(false);

  function _onRefresh() {
    setRefreshing(true);
    props.getGames(props.auth.profile.matricula);
    setRefreshing(false);
  }

  const { games } = props.game;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
      }
    >
      <Content padder>
        {games ? (
          games.length > 0 ? (
            games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                navigation={props.navigation}
              />
            ))
          ) : (
            <Text>Você não está cadastrado em nenhum game</Text>
          )
        ) : (
          <ActivityIndicator />
        )}
      </Content>
    </ScrollView>
  );
};

const mapStateToProps = ({ game, auth }) => ({
  game,
  auth
});

export default connect(
  mapStateToProps,
  { getGames }
)(Games);
