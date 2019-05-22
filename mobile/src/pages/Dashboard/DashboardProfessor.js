import React, { useState } from "react";

import { connect } from "react-redux";

import { ScrollView } from "react-native-gesture-handler";

import { RefreshControl } from "react-native";

import { Content } from "native-base";

import GamesAtivos from "~/components/Games/GamesAtivos";
import TarefasPendentes from "~/components/TarefasPendentes/TarefasPendentes";
import RelatorioProfessor from "~/components/Relatorio/RelatorioProfessor";

import {
  relatorioProfessor,
  getGamesAtivos
} from "~/store/actions/gameActions";
import { getTarefasPendentes } from "~/store/actions/tarefaActions";

const DashboardProfessor = props => {
  const [refreshing, setRefreshing] = useState(false);

  function _onRefresh() {
    setRefreshing(true);
    props.getTarefasPendentes(props.auth.profile.matricula);
    props.getGamesAtivos(props.auth.profile.matricula);
    props.relatorioProfessor(props.auth.profile.matricula);
    setRefreshing(false);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
      }
    >
      <Content padder>
        <GamesAtivos navigation={props.navigation} />
        <TarefasPendentes />
        <RelatorioProfessor />
      </Content>
    </ScrollView>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { relatorioProfessor, getGamesAtivos, getTarefasPendentes }
)(DashboardProfessor);
