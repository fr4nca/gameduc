import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { connect } from "react-redux";
import { getGames } from "../../store/actions/gameActions";
import GameCard from "./GameCard";
import { Content, Text } from "native-base";

const Games = props => {
  useEffect(() => {
    props.getGames(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const { games } = props.game;

  return (
    <ScrollView>
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
