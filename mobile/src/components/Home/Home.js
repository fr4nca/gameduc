import React, { Component } from "react";

import { Container, Text } from "native-base";

class Home extends Component {
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

export default Home;
