import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Right
} from "native-base";

import { connect } from "react-redux";

import { loginUser } from "~/store/actions/authActions";

class Login extends Component {
  _isMounted = false;

  static navigationOptions = {
    title: "Login"
  };

  state = {
    email: "",
    senha: "",
    emailErr: "",
    senhaErr: ""
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.navigation.navigate("App");
    }
  }

  componentWillReceiveProps(next) {
    if (next.auth.isAuthenticated) {
      this.props.navigation.navigate("App");
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = () => {
    const { email, senha } = this.state;

    this.setState({
      ...this.state,
      emailErr: email === "" ? "Digite seu email" : "",
      senhaErr: senha === "" ? "Digite sua senha" : ""
    });

    setTimeout(() => {
      this._isMounted
        ? this.setState({
            ...this.state,
            emailErr: "",
            senhaErr: ""
          })
        : null;
    }, 2350);

    clearTimeout();

    if (email !== "" && senha !== "") {
      const loginUser = {
        email,
        senha
      };

      this.props.loginUser(loginUser);
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={email => this.setState({ ...this.state, email })}
                name="email"
              />
            </Item>
            {this.state.emailErr !== "" ? (
              <Text style={styles.error}>{this.state.emailErr}</Text>
            ) : null}
            <Item floatingLabel>
              <Label>Senha</Label>
              <Input
                secureTextEntry={true}
                value={this.state.senha}
                onChangeText={senha => this.setState({ ...this.state, senha })}
                name="senha"
              />
            </Item>
            {this.state.senhaErr !== "" ? (
              <Text style={styles.error}>{this.state.senhaErr}</Text>
            ) : null}
          </Form>
          <Text style={styles.error}>{this.props.errors.msg.error}</Text>
          <Right>
            <Button onPress={this.handleSubmit} style={styles.button}>
              <Text>Entrar</Text>
            </Button>
          </Right>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
    marginTop: 5
  }
});

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
