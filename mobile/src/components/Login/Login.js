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

export default class Login extends Component {
  login = async () => {
    await AsyncStorage.setItem("@Gameduc:userToken", "oi");
    this.props.navigation.navigate("App");
  };

  static navigationOptions = {
    title: "Login"
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <Right>
            <Button onPress={this.login} style={styles.button}>
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
