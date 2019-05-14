import React, { Component } from "react";

import { StyleSheet, AsyncStorage } from "react-native";

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
  static navigationOptions = {
    title: "Login"
  };

  state = {
    email: "",
    senha: ""
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

  handleSubmit = () => {
    const { email, senha } = this.state;

    const loginUser = {
      email,
      senha
    };

    this.props.loginUser(loginUser);
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                value={this.state.email}
                onChangeText={email => this.setState({ ...this.state, email })}
                name="email"
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                value={this.state.senha}
                onChangeText={senha => this.setState({ ...this.state, senha })}
                name="senha"
              />
            </Item>
          </Form>
          <Right>
            <Button onPress={this.handleSubmit} style={styles.button}>
              <Text>Login</Text>
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
  }
});

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
