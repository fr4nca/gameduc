import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { RefreshControl } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { Content } from "native-base";

import GamesAtivos from "~/components/Games/GamesAtivos";
import Pontuacao from "~/components/Pontuacao/Pontuacao";
import RelatorioAluno from "~/components/Relatorio/RelatorioAluno";

import {
  relatorioAluno,
  pontuacao,
  getGamesAtivos
} from "~/store/actions/gameActions";

const DashboardAluno = props => {
  useEffect(() => {
    props.relatorioAluno(props.auth.profile.matricula);
    props.getGamesAtivos(props.auth.profile.matricula);
    props.pontuacao(props.auth.profile.matricula);
  }, [props.auth.profile.matricula]);

  const [refreshing, setRefreshing] = useState(false);

  function _onRefresh() {
    setRefreshing(true);
    props.relatorioAluno(props.auth.profile.matricula);
    props.getGamesAtivos(props.auth.profile.matricula);
    props.pontuacao(props.auth.profile.matricula);
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
        <Pontuacao />
        <RelatorioAluno />
      </Content>
    </ScrollView>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { relatorioAluno, pontuacao, getGamesAtivos }
)(DashboardAluno);
