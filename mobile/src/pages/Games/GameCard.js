import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "~/services/api";

import { ActivityIndicator } from "react-native";
import { Card, CardItem, Text } from "native-base";

const GameCard = props => {
  const [disc, setDisc] = useState(undefined);

  const getDisciplina = async () => {
    const data = await axios.get(
      `/disciplina/${props.game.ta_professor_disciplina_tb_disciplina_id}`
    );

    setDisc(data.data);
  };

  useEffect(() => {
    getDisciplina();
  }, [props]);

  return (
    <Card>
      <CardItem header bordered>
        <Text>{props.game.nome}</Text>
      </CardItem>
      <CardItem>
        <Text>
          Início: {moment.utc(props.game.dta_inicio).format("DD/MM/YYYY")}
        </Text>
      </CardItem>
      <CardItem>
        <Text>
          Finalização: {moment.utc(props.game.dta_fim).format("DD/MM/YYYY")}
        </Text>
      </CardItem>
      <CardItem bordered>
        {disc ? <Text>Disciplina: {disc.nome}</Text> : <ActivityIndicator />}
      </CardItem>
      <CardItem
        button
        onPress={() =>
          props.navigation.navigate("Game", {
            game: props.game,
            title: props.game.nome
          })
        }
      >
        <Text
          style={{
            color: "#4F8EF7",
            alignSelf: "center"
          }}
        >
          Visitar
        </Text>
      </CardItem>
    </Card>
  );
};

export default GameCard;
