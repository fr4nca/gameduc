import React, { Component } from "react";
import { connect } from "react-redux";

import { getTarefas } from "../../store/actions/tarefaActions";

class Tarefas extends Component {
  componentDidMount() {
    this.props.getTarefas(1);
  }

  render() {
    return (
      <div>
        <div className="box">
          <h3 className="subtitle is-3">Tarefas</h3>
          <hr />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tarefa, game }) => ({ tarefa, game });

export default connect(
  mapStateToProps,
  { getTarefas }
)(Tarefas);
