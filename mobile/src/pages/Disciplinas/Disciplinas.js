import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Body,
  List,
  ListItem,
  Content
} from "native-base";

import { connect } from "react-redux";
import { getDisciplinasProfessor } from "~/store/actions/disciplinaActions";

const Disciplinas = props => {
  useEffect(() => {
    props.getDisciplinasProfessor(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const { disciplinasProf } = props.disciplina;

  return (
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
              <Text>Nenhuma tarefa pendente</Text>
            </CardItem>
          )
        ) : (
          <CardItem>
            <ActivityIndicator />
          </CardItem>
        )}
      </Card>
    </Content>
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
