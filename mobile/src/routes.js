import React from "react";

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
import Disciplinas from "~/pages/Disciplinas/Disciplinas";

import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";

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
        title: navigation.state.params.title
          ? navigation.state.params.title
          : "Game",
        game: navigation.state.params.game
      })
    }
  },
  {
    initialRouteName: "Games",
    headerLayoutPreset: "center"
  }
);

const DashboardStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: () => ({
        title: "Dashboard"
      })
    }
  },
  {
    headerLayoutPreset: "center"
  }
);

const DisciplinasStack = createStackNavigator(
  {
    Disciplinas: {
      screen: Disciplinas,
      navigationOptions: () => ({
        title: "Disciplinas"
      })
    }
  },
  {
    headerLayoutPreset: "center"
  }
);

const AppStack = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name="dashboard"
            size={25}
            color={focused ? "#FFF" : "#4F8EF7"}
          />
        )
      }
    },
    Games: {
      screen: GamesStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon name="gamepad" size={25} color={focused ? "#FFF" : "#4F8EF7"} />
        )
      }
    },
    Disciplinas: {
      screen: DisciplinasStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon5
            name="chalkboard-teacher"
            size={25}
            color={focused ? "#FFF" : "#4F8EF7"}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#4F8EF7",
      activeTintColor: "#fff",
      inactiveTintColor: "#4F8EF7"
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
