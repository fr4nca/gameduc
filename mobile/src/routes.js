import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import LoginLoading from "~/pages/Login/LoginLoading";
import Login from "~/pages/Login/Login";
import Dashboard from "~/pages/Dashboard/Dashboard";
import Games from "~/pages/Games/Games";
import Game from "~/pages/Games/Game";

const GamesStack = createStackNavigator(
  {
    Games: {
      screen: Games,
      navigationOptions: () => ({
        title: "Games"
      })
    },
    Game: {
      screen: Game,
      navigationOptions: ({ navigation }) => ({
        title:
          navigation.state &&
          navigation.state.params &&
          navigation.state.params.title
            ? navigation.state.params.title
            : "Game"
      })
    }
  },
  {
    initialRouteName: "Games",
    headerLayoutPreset: "center"
  }
);

const AppStack = createBottomTabNavigator(
  {
    Dashboard,
    Games: GamesStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#4F8EF7",
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginLoading,
      Login,
      App: AppStack
    },
    {
      initialRouteName: "LoginLoading"
    }
  )
);
