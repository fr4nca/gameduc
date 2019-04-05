import React, { Component } from "react";
import { connect } from "react-redux";

import { getGames } from "../../actions/gameActions";

class Games extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  render() {
    return <div>Games</div>;
  }
}

const mapStateToProps = ({ game }) => ({
  game
});

export default connect(
  mapStateToProps,
  { getGames }
)(Games);
