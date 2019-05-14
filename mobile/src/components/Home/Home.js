import React, { Component } from "react";

import { Container, Text } from "native-base";

export default class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    return (
      <Container>
        <Text>Oi</Text>
      </Container>
    );
  }
}
