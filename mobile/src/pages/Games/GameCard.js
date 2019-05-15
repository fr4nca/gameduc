import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "~/services/api";

import { ActivityIndicator } from "react-native";
import { Card, CardItem, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    console.log("oi");
  }, [props]);

  return (
    <Card>
      <CardItem header>
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
      <CardItem>
        {disc ? <Text>Disciplina: {disc.nome}</Text> : <ActivityIndicator />}
      </CardItem>
      <CardItem>
        <Text
          style={{
            color: "#4F8EF7",
            alignSelf: "center",
            width: 100 + "%"
          }}
          onPress={() => props.navigate("Game", { game: props.game })}
        >
          Visitar
        </Text>
      </CardItem>
    </Card>
  );
};

export default GameCard;
