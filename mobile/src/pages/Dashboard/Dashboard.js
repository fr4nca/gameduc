import React, { Component } from "react";

import { connect } from "react-redux";

import { ScrollView } from "react-native-gesture-handler";

import GamesAtivos from "~/components/Games/GamesAtivos";
import TarefasPendentes from "~/components/TarefasPendentes/TarefasPendentes";
import RelatorioProfessor from "~/components/Relatorio/RelatorioProfessor";

class Dashboard extends Component {
  render() {
    return (
      <ScrollView>
        <GamesAtivos />
        <TarefasPendentes />
        <RelatorioProfessor />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
