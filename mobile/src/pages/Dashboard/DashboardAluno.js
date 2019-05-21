import React from "react";

import { connect } from "react-redux";

import { ScrollView } from "react-native-gesture-handler";

import { Content } from "native-base";

import GamesAtivos from "~/components/Games/GamesAtivos";
import Pontuacao from "~/components/Pontuacao/Pontuacao";
import RelatorioAluno from "~/components/Relatorio/RelatorioAluno";

const DashboardAluno = props => {
  return (
    <ScrollView>
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
  {}
)(DashboardAluno);
