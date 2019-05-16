import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Card, CardItem, Text, Body, List, ListItem } from "native-base";

import { connect } from "react-redux";
import { getDisciplinasProfessor } from "~/store/actions/disciplinaActions";

const Disciplinas = props => {
  useEffect(() => {
    props.getDisciplinasProfessor(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const { disciplinasProf } = props.disciplina;

  return (
    <Card>
      <CardItem header>
        <Text>Suas disciplinas</Text>
      </CardItem>
      <CardItem>
        <Body>
          <List>
            {disciplinasProf ? (
              disciplinasProf.length > 0 ? (
                disciplinasProf.map(d => (
                  <ListItem key={d.id}>
                    <Text>{d.nome}</Text>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <Text>Nenhuma tarefa pendente</Text>
                </ListItem>
              )
            ) : (
              <ActivityIndicator />
            )}
          </List>
        </Body>
      </CardItem>
    </Card>
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
