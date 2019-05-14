import React from "react";
import { StatusBar } from "react-native";

import { Provider } from "react-redux";
import store from "./store";

import "~/config/ReactotronConfig";

import Routes from "~/routes";

const App = () => (
  <Provider store={store}>
    <StatusBar barStyle="dark-content" />
    <Routes />
  </Provider>
);

export default App;
