import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { Card, CardItem, Text, Body } from "native-base";

import { connect } from "react-redux";

import { getGamesAtivos } from "~/store/actions/gameActions";
import GameCard from "./GameCard";

const GamesAtivos = props => {
  useEffect(() => {
    props.getGamesAtivos(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const { gamesAtivos: games } = props.game;

  return (
    <Card>
      <CardItem header bordered>
        <Text>Games ativos</Text>
      </CardItem>
      <CardItem>
        <Body>
          {games ? (
            games.length >= 1 ? (
              games.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  navigation={props.navigation}
                />
              ))
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
  { getGamesAtivos }
)(GamesAtivos);
