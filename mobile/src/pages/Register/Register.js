import React, { Component } from "react";
import { startNFC, stopNFC, isNFCSupported } from "../../helpers/NFCHelper";
import moment from "moment";

import { StyleSheet, ActivityIndicator } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Left,
  Text,
  Content,
  DatePicker,
  Picker,
  Card,
  CardItem
} from "native-base";

import { connect } from "react-redux";

import { registerUser } from "~/store/actions/authActions";
import isEmpty from "~/utils/isEmpty";

class Register extends Component {
  static navigationOptions = {
    title: "Register"
  };

  state = {
    nome: "",
    sobrenome: "",
    matricula: "",
    dta_nascimento: "",
    curso: "",
    email: "",
    senha: "",
    papel: "aluno",
    conSenha: "",
    graduacao: "",
    tagId: "",
    isSupported: false,
    addCarteirinha: false
  };

  async componentWillMount() {
    const isSupported = await isNFCSupported();

    this.setState({
      ...this.state,
      isSupported
    });
  }

  handleNFCTagReading = nfcResult => {
    if (this.state.addCarteirinha) {
      const tagId = nfcResult.id;

      this.setState({
        ...this.state,
        tagId
      });
    }
    stopNFC();
  };

  handleSubmit = () => {
    const {
      nome,
      sobrenome,
      matricula,
      dta_nascimento,
      curso,
      email,
      senha,
      papel,
      graduacao,
      conSenha,
      tagId
    } = this.state;

    if (senha !== conSenha) {
      alert("As senhas devem coincidir");
    }

    const newUser = {
      nome,
      sobrenome,
      matricula,
      dta_nascimento,
      curso,
      email,
      senha,
      papel,
      graduacao,
      conSenha,
      tagId
    };

    newUser.dta_nascimento = moment.utc(dta_nascimento).format("YYYY-MM-DD");
    if (
      !isEmpty(newUser.nome) &&
      !isEmpty(newUser.sobrenome) &&
      !isEmpty(newUser.matricula) &&
      !isEmpty(newUser.dta_nascimento) &&
      !isEmpty(newUser.email) &&
      !isEmpty(newUser.senha) &&
      !isEmpty(newUser.papel) &&
      !isEmpty(newUser.conSenha)
    ) {
      if (
        (papel === "professor" && !isEmpty(graduacao)) ||
        (papel === "aluno" && !isEmpty(curso))
      ) {
        this.props.registerUser(newUser, this.props.navigation);
      } else {
        alert("Preencha curso ou graduação!");
      }
    } else {
      alert("Preencha todos os campos!");
    }
  };

  handlePicker = texto => {
    this.state.papel === "professor"
      ? this.setState({ ...this.state, graduacao: texto })
      : this.setState({ ...this.state, curso: texto });
  };

  render() {
    return (
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>Register</Text>
          </CardItem>
          <Form style={{ padding: 15 }}>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input
                value={this.state.nome}
                onChangeText={nome => this.setState({ ...this.state, nome })}
                name="nome"
              />
            </Item>
            <Item floatingLabel>
              <Label>Sobrenome</Label>
              <Input
                value={this.state.sobrenome}
                onChangeText={sobrenome =>
                  this.setState({ ...this.state, sobrenome })
                }
                name="sobrenome"
              />
            </Item>
            <Item floatingLabel>
              <Label>Matricula</Label>
              <Input
                value={this.state.matricula}
                keyboardType="numeric"
                onChangeText={matricula =>
                  this.setState({ ...this.state, matricula })
                }
                name="matricula"
              />
            </Item>
            <DatePicker
              locale={"pt"}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Data de nascimento"
              placeHolderTextStyle={{
                color: "#444",
                marginBottom: -30,
                marginTop: 15,
                marginLeft: 4
              }}
              textStyle={{
                color: "#444",
                marginBottom: -30,
                marginTop: 15,
                marginLeft: 4
              }}
              onDateChange={dta_nascimento =>
                this.setState({ ...this.state, dta_nascimento })
              }
              disabled={false}
            />
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                keyboardType="email-address"
                secureTextEntry={true}
                value={this.state.email}
                onChangeText={email => this.setState({ ...this.state, email })}
                name="email"
              />
            </Item>
            <Item floatingLabel>
              <Label>Senha</Label>
              <Input
                secureTextEntry={true}
                value={this.state.senha}
                onChangeText={senha => this.setState({ ...this.state, senha })}
                name="senha"
              />
            </Item>
            <Item floatingLabel>
              <Label>Confirme sua senha</Label>
              <Input
                secureTextEntry={true}
                value={this.state.conSenha}
                onChangeText={conSenha =>
                  this.setState({ ...this.state, conSenha })
                }
                name="conSenha"
              />
            </Item>
            <Item picker style={{ marginLeft: 15, marginTop: 10 }}>
              <Picker
                mode="dropdown"
                placeholder="Papel"
                placeholderStyle={{ color: "#444" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.papel}
                onValueChange={papel => this.setState({ ...this.state, papel })}
              >
                <Picker.Item label="Aluno" value="aluno" />
                <Picker.Item label="Professor" value="professor" />
              </Picker>
            </Item>

            <Item floatingLabel>
              <Label>
                {this.state.papel === "professor" ? "Graduação" : "Curso"}
              </Label>
              <Input
                value={
                  this.state.papel === "professor"
                    ? this.state.graduacao
                    : this.state.curso
                }
                onChangeText={this.handlePicker}
              />
            </Item>

            {this.state.isSupported && !this.state.addCarteirinha ? (
              <Button
                light
                style={styles.addCarteirinha}
                onPress={() => {
                  this.setState({ ...this.state, addCarteirinha: true });
                  startNFC(this.handleNFCTagReading);
                }}
              >
                <Text>Adicionar carteirinha</Text>
              </Button>
            ) : null}

            {this.state.addCarteirinha && this.state.tagId === "" ? (
              <Text style={styles.carteirinha}>Aproxime sua carteirinha</Text>
            ) : null}

            {this.state.tagId !== "" ? (
              <>
                <Text style={styles.icon}>
                  <Icon name="check" size={25} color="green" /> Carteirinha
                  incluída com sucesso{" "}
                </Text>
                <Text style={styles.icon}>
                  <Icon
                    name="trash"
                    size={25}
                    color="red"
                    onPress={() => {
                      this.setState({ ...this.state, tagId: "" });
                      startNFC(this.handleNFCTagReading);
                    }}
                  />{" "}
                  Remover?
                </Text>
              </>
            ) : null}
            {this.props.auth.isLoading ? (
              <ActivityIndicator style={{ marginTop: 10 }} />
            ) : (
              <>
                <Left>
                  <Button onPress={this.handleSubmit} style={styles.button}>
                    <Text>Registrar</Text>
                  </Button>
                </Left>
                <Left>
                  <Button
                    onPress={() => this.props.navigation.navigate("Login")}
                    style={styles.button}
                  >
                    <Text>Login</Text>
                  </Button>
                </Left>
              </>
            )}
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
  addCarteirinha: {
    marginLeft: 15,
    marginTop: 20
  },
  carteirinha: {
    fontSize: 16,
    color: "#555",
    marginLeft: 15,
    marginTop: 20
  },
  icon: {
    alignSelf: "center",
    marginTop: 20
  },
  datePicker: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: -20,
    borderWidth: 0
  }
});

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);

//TODO: Validation and errors
