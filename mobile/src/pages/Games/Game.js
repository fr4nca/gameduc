import React, { Component } from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";

export class Game extends Component {
  state = {
    game: {}
  };

  componentDidMount() {
    const game = this.props.navigation.getParam("game", {});

    this.setState({
      ...this.state,
      game
    });

    this.props.navigation.setParams({ title: game.nome });
  }

  render() {
    return (
      <View>
        <Text> {this.state.game.nome} </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Game);
