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
