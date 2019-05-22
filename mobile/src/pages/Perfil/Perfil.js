import React, { useState } from "react";
import { Alert } from "react-native";
import { Card, CardItem, Text, Content, Button } from "native-base";

import moment from "moment";

import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

import { logoutUser } from "~/store/actions/authActions";

const Perfil = props => {
  const { profile, user } = props.auth;

  return (
    <ScrollView>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>Perfil</Text>
          </CardItem>
          <CardItem>
            <Text style={{ fontWeight: "bold" }}>Matrícula: </Text>
            <Text>{profile.matricula}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ fontWeight: "bold" }}>Nome: </Text>
            <Text>
              {profile.nome} {profile.sobrenome}
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ fontWeight: "bold" }}>Email: </Text>
            <Text>{user.email}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ fontWeight: "bold" }}>Data de nascimento: </Text>
            <Text>
              {moment.utc(profile.dta_nascimento).format("DD/MM/YYYY")}
            </Text>
          </CardItem>
          {user.papel === "professor" ? (
            <CardItem>
              <Text style={{ fontWeight: "bold" }}>Graduação: </Text>
              <Text>{profile.graduacao}</Text>
            </CardItem>
          ) : (
            <CardItem>
              <Text style={{ fontWeight: "bold" }}>Curso: </Text>
              <Text>{profile.curso}</Text>
            </CardItem>
          )}
        </Card>
        <Button
          danger
          full
          rounded
          style={{ marginTop: 10 }}
          onPress={() => {
            Alert.alert(
              "Tem certeza que deseja sair?",
              "Clique em 'sair' para sair",
              [
                {
                  text: "Abortar",
                  style: "cancel"
                },
                {
                  text: "Sair",
                  onPress: () => {
                    props.logoutUser();
                    props.navigation.navigate("LoginLoading");
                  }
                }
              ]
            );
          }}
        >
          <Text>Sair</Text>
        </Button>
      </Content>
    </ScrollView>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Perfil);
