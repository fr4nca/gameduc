import React, { Component } from "react";

import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    senha: ""
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(next) {
    if (next.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { email, senha } = this.state;

    const loginUser = {
      email,
      senha
    };

    this.props.loginUser(loginUser);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={this.handleChange}
          />
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            onChange={this.handleChange}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
