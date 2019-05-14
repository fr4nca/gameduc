import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import LoginLoading from "~/components/Login/LoginLoading";
import Login from "~/components/Login/Login";
import Home from "~/components/Home/Home";

const AuthStack = createStackNavigator({ Login });
const AppStack = createStackNavigator({ Home });

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginLoading,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "LoginLoading"
    }
  )
);
