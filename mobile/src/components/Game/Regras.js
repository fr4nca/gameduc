import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { Card, CardItem, Text, Left, Right } from "native-base";

import { connect } from "react-redux";
import { getRegras } from "~/store/actions/regraActions";

const Regras = props => {
  useEffect(() => {
    props.getRegras(props.currentGame.id);
  }, []);

  const { regras } = props.regra;

  return (
    <Card>
      <CardItem header bordered>
        <Text>Regras</Text>
      </CardItem>
      <CardItem bordered>
        <Left>
          <Text style={{ fontWeight: "bold" }}>Descrição</Text>
        </Left>
        <Left>
          <Text style={{ fontWeight: "bold" }}>Classificação</Text>
        </Left>
        <Right>
          <Text style={{ fontWeight: "bold" }}>Pontuação</Text>
        </Right>
      </CardItem>
      {regras ? (
        regras.length > 0 ? (
          regras.map(regra => {
            return (
              <CardItem key={regra.id}>
                <Left>
                  <Text>{regra.descricao}</Text>
                </Left>
                <Left>
                  <Text>{regra.classificacao}</Text>
                </Left>
                <Right>
                  <Text>{regra.pontuacao}</Text>
                </Right>
              </CardItem>
            );
          })
        ) : (
          <CardItem>
            <Text>Nenhuma regra cadastrada</Text>
          </CardItem>
        )
      ) : (
        <CardItem>
          <ActivityIndicator />
        </CardItem>
      )}
    </Card>
  );
};

const mapStateToProps = ({ regra, auth }) => ({ regra, auth });

export default connect(
  mapStateToProps,
  { getRegras }
)(Regras);
