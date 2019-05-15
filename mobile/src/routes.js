import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import LoginLoading from "~/pages/Login/LoginLoading";
import Login from "~/pages/Login/Login";
import Dashboard from "~/pages/Dashboard/Dashboard";

const AppStack = createBottomTabNavigator(
  {
    Dashboard
  },
  {
    tabBarOptions: {
      activeTintColor: "blue",
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
