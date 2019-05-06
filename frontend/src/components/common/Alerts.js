import React, { Component } from "react";
import { withAlert } from "react-alert";

import { connect } from "react-redux";

class Alerts extends Component {
  componentDidUpdate(prevProps) {
    const { errors, alert, messages } = this.props;

    if (errors !== prevProps.errors) {
      alert.error(errors.msg.error);
    }

    if (messages !== prevProps.messages) {
      if (messages.registerSuccess) alert.success(messages.registerSuccess);
      if (messages.addTarefa) alert.success(messages.addTarefa);
      if (messages.deleteTarefa) alert.success(messages.deleteTarefa);
      if (messages.validateTarefa) alert.success(messages.validateTarefa);
      if (messages.addRegra) alert.success(messages.addRegra);
      if (messages.editRegra) alert.success(messages.editRegra);
      if (messages.deleteRegra) alert.success(messages.deleteRegra);
      if (messages.deleteAluno) alert.success(messages.deleteAluno);
      if (messages.addAluno) alert.success(messages.addAluno);
      if (messages.createGame) alert.success(messages.createGame);
      if (messages.createDisciplina) alert.success(messages.createDisciplina);
      if (messages.vincularDisciplina)
        alert.success(messages.vincularDisciplina);
      if (messages.desvincularDisciplina)
        alert.success(messages.desvincularDisciplina);
    }
  }

  render() {
    return <></>;
  }
}

const mapStateToProps = ({ errors, messages }) => ({
  errors,
  messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
