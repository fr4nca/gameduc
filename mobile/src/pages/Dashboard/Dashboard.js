import React, { Component } from "react";

import { Container, Text } from "native-base";

import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Text>{this.props.auth.profile.nome}</Text>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
