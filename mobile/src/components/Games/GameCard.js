import React from "react";

import { StyleSheet } from "react-native";

import { Card, CardItem, Text, Right } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";

const GameCard = props => {
  return (
    <Card style={styles.card}>
      <CardItem
        header
        button
        onPress={() =>
          props.navigation.navigate("Game", {
            game: props.game,
            title: props.game.nome
          })
        }
      >
        <Text>{props.game.nome}</Text>
        <Right />
        <Right>
          <Icon name="chevron-right" size={20} color="#4F8EF7" />
        </Right>
      </CardItem>
    </Card>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  card: {
    width: 100 + "%"
  }
});
