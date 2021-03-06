import React, { Component } from "react";
import { startNFC, stopNFC, isNFCSupported } from "../../helpers/NFCHelper";

import { StyleSheet, ActivityIndicator, Image } from "react-native";

import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Content,
  Right,
  View
} from "native-base";

import { connect } from "react-redux";

import { loginUser } from "~/store/actions/authActions";
import isEmpty from "~/utils/isEmpty";

import logo from "~/static/img/logo1024.png";

class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    email: "",
    senha: "",
    emailErr: "",
    senhaErr: "",
    isSupported: false
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
      this.props.loginUser({ tagId });
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
      const loginUser = {
        email,
        senha
      };

      this.props.loginUser(loginUser);
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
        <Image
          source={logo}
          style={{
            width: 340,
            height: 340,
            alignSelf: "center",
            marginBottom: -60
          }}
        />
        <View>
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

            {this.state.isSupported ? (
              <>
                <Right>
                  <Text style={styles.ou}>ou</Text>
                </Right>
                <Right>
                  <Text style={styles.carteirinha}>
                    Aproxime sua carteirinha
                  </Text>
                </Right>
              </>
            ) : null}

            {this.props.auth.isLoading ? (
              <ActivityIndicator style={styles.button} />
            ) : (
              <Button
                full
                rounded
                onPress={this.handleSubmit}
                style={styles.button}
              >
                <Text>Entrar</Text>
              </Button>
            )}
          </Form>
          <Right>
            <Button
              transparent
              style={{
                color: "#4F8EF7"
              }}
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            >
              <Text>Não possui uma conta? Clique aqui</Text>
            </Button>
          </Right>
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 80
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
    marginTop: 5
  },
  carteirinha: {
    color: "#555",
    marginTop: 40
  },
  ou: {
    color: "#555",
    marginTop: 10
  }
});

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
