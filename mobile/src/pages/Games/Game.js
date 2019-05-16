import React, { Component } from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";

export class Game extends Component {
  render() {
    const game = this.props.navigation.getParam("game", {});

    return (
      <View>
        <Text> {game.nome} </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Game);
