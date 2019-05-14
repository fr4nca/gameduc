import React, { Component } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  StyleSheet
} from "react-native";

export default class LoginLoading extends Component {
  constructor() {
    super();
    this.loginLoading();
  }

  loginLoading = async () => {
    const userToken = await AsyncStorage.getItem("@Gameduc:userToken");

    this.props.navigation.navigate(userToken ? "App" : "Auth");
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
