import React from "react";

import { Card, CardItem, Text, Body } from "native-base";

const TarefasPendentes = () => {
  return (
    <Card>
      <CardItem header>
        <Text>NativeBase</Text>
      </CardItem>
      <CardItem>
        <Body>
          <Text>//Your text here</Text>
        </Body>
      </CardItem>
      <CardItem footer>
        <Text>GeekyAnts</Text>
      </CardItem>
    </Card>
  );
};

export default TarefasPendentes;
