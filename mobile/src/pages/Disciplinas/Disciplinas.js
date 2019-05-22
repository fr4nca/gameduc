import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Card, CardItem, Text, Content } from "native-base";

import { connect } from "react-redux";
import { getDisciplinasProfessor } from "~/store/actions/disciplinaActions";
import { ScrollView } from "react-native-gesture-handler";

const Disciplinas = props => {
  useEffect(() => {
    props.getDisciplinasProfessor(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const [refreshing, setRefreshing] = useState(false);

  function _onRefresh() {
    setRefreshing(true);
    props.getDisciplinasProfessor(props.auth.profile.matricula);
    setRefreshing(false);
  }

  const { disciplinasProf } = props.disciplina;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
      }
    >
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>Suas disciplinas</Text>
          </CardItem>
          {disciplinasProf ? (
            disciplinasProf.length > 0 ? (
              disciplinasProf.map(d => (
                <CardItem key={d.id} bordered>
                  <Text>{d.nome}</Text>
                </CardItem>
              ))
            ) : (
              <CardItem>
                <Text>Nenhuma disciplina cadastrada</Text>
              </CardItem>
            )
          ) : (
            <CardItem>
              <ActivityIndicator />
            </CardItem>
          )}
        </Card>
      </Content>
    </ScrollView>
  );
};

const mapStateToProps = ({ disciplina, auth }) => ({
  disciplina,
  auth
});

export default connect(
  mapStateToProps,
  { getDisciplinasProfessor }
)(Disciplinas);
