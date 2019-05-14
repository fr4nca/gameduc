import React, { Component } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  StyleSheet
} from "react-native";

import store from "~/store";

import {
  setCurrentProfile,
  setCurrentUser,
  logoutUser
} from "~/store/actions/authActions";

import setAuthToken from "~/utils/setAuthToken";

import jwt_decode from "jwt-decode";

export default class LoginLoading extends Component {
  constructor() {
    super();
    this._loginLoading();
  }

  _loginLoading = async () => {
    await AsyncStorage.clear();
    if (await AsyncStorage.getItem("@Gameduc:userToken")) {
      setAuthToken(await AsyncStorage.getItem("@Gameduc:userToken"));

      const decoded = jwt_decode(
        await AsyncStorage.getItem("@Gameduc:userToken")
      );

      store.dispatch(setCurrentUser(decoded));
      store.dispatch(setCurrentProfile());

      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        this.props.navigation.navigate("Login");
      }

      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("Login");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
