import React, { useEffect } from "react";

import { Card, CardItem, Text, Body } from "native-base";

import { connect } from "react-redux";
import { getRanking } from "~/store/actions/gameActions";

const Ranking = props => {
  useEffect(() => {
    props.getRanking(props.currentGame.id);
  }, []);

  return (
    <Card>
      <CardItem header bordered>
        <Text>Ranking</Text>
      </CardItem>
      <CardItem>
        <Body>
          <Text>Oi</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

const mapStateToProps = ({ game }) => ({ game });

export default connect(
  mapStateToProps,
  { getRanking }
)(Ranking);
