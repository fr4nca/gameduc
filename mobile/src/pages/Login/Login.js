import React, { Component } from "react";
import { startNFC, stopNFC, isNFCSupported } from "../../helpers/NFCHelper";

import { StyleSheet, ActivityIndicator } from "react-native";

import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Content,
  Left,
  Card,
  CardItem,
  Body
} from "native-base";

import { connect } from "react-redux";

import { loginUser } from "~/store/actions/authActions";
import isEmpty from "~/utils/isEmpty";

class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    email: "",
    senha: "",
    emailErr: "",
    senhaErr: "",
    isSupported: false,
    isLoading: false
  };

  componentWillMount() {
    startNFC(this.handleNFCTagReading);
  }

  componentWillUnmount() {
    stopNFC();
  }

  async componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.papel === "professor")
        this.props.navigation.navigate("AppProfessorStack");
      else if (this.props.auth.user.papel === "aluno")
        this.props.navigation.navigate("AppAlunoStack");
    }

    const isSupported = await isNFCSupported();
    this.setState({
      ...this.state,
      isSupported
    });
  }

  componentWillReceiveProps(next) {
    if (next.auth.isAuthenticated) {
      if (next.auth.user.papel === "professor")
        this.props.navigation.navigate("AppProfessorStack");
      else if (next.auth.user.papel === "aluno")
        this.props.navigation.navigate("AppAlunoStack");
    }
  }

  handleNFCTagReading = nfcResult => {
    const tagId = nfcResult.id;

    if (!isEmpty(tagId)) {
      this.setState({
        ...this.state,
        isLoading: true
      });

      this.props.loginUser({ tagId });

      this.setState({
        ...this.state,
        isLoading: false
      });
    }
  };

  handleSubmit = () => {
    const { email, senha } = this.state;

    this.setState({
      ...this.state,
      emailErr: email === "" ? "Digite seu email" : "",
      senhaErr: senha === "" ? "Digite sua senha" : ""
    });

    if (!isEmpty(email) && !isEmpty(senha)) {
      this.setState({
        ...this.state,
        isLoading: true
      });

      const loginUser = {
        email,
        senha
      };

      this.props.loginUser(loginUser);

      this.setState({
        ...this.state,
        isLoading: false
      });
    }
  };

  render() {
    return (
      <Content
        padder
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Card>
          <CardItem header bordered>
            <Text>Login</Text>
          </CardItem>
          <Form style={{ padding: 15 }}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={email =>
                  this.setState({ ...this.state, email, emailErr: "" })
                }
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
                onChangeText={senha =>
                  this.setState({ ...this.state, senha, senhaErr: "" })
                }
                name="senha"
              />
            </Item>

            {this.state.senhaErr !== "" ? (
              <Text style={styles.error}>{this.state.senhaErr}</Text>
            ) : null}

            <Text style={styles.error}>{this.props.errors.msg.error}</Text>
            {!this.state.isLoading ? (
              <>
                <Left>
                  <Button onPress={this.handleSubmit} style={styles.button}>
                    <Text>Entrar</Text>
                  </Button>
                </Left>
                <Button
                  onPress={() => this.props.navigation.navigate("Register")}
                  style={styles.button}
                >
                  <Text>Registrar</Text>
                </Button>
              </>
            ) : (
              <ActivityIndicator />
            )}

            {this.state.isSupported ? (
              <Text style={styles.carteirinha}>
                Ou aproxime sua carteirinha
              </Text>
            ) : null}
          </Form>
        </Card>
      </Content>
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
  },
  carteirinha: {
    color: "#555",
    marginLeft: 15,
    marginTop: 18
  }
});

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
