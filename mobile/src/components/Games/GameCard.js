import React from "react";

import { StyleSheet } from "react-native";

import { Card, CardItem, Text, Right } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";

const GameCard = props => {
  return (
    <Card style={styles.card}>
      <CardItem header>
        <Text>{props.game.nome}</Text>
        <Right />
        <Right>
          <Icon
            name="chevron-right"
            size={20}
            color="#4F8EF7"
            onPress={() => props.navigate("Game", { game: props.game })}
          />
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
