import { StatusBar } from "expo-status-bar";
import React from "react";
import Main from "./screens/Main";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ToDo from "./screens/ToDo";
import ManageAccount from "./screens/ManageAccount";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResetPassword from "./screens/ResetPassword";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Stack = createNativeStackNavigator();
//  SplashScreen.preventAutoHideAsync();
// const BottomNavigator = () => {
//   return (
//     <bottomNav.Navigator>
//       <bottomNav.Screen name="Login" component={} />
//       <bottomNav.Screen name="ManageAccount" component={ManageAccount} />
//     </bottomNav.Navigator>
//   );
// };

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          title="Main"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          title="Login"
          options={{
            headerTintColor: "#ff788b",
            headerTitleStyle: {
              color: "black",
            },
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          title="Create New Account"
          options={{
            headerShown: true,
            headerTintColor: "#ff788b",
            headerTitleStyle: {
              color: "black",
            },
          }}
        />

        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: true,
            headerTintColor: "#ff788b",
            headerTitleStyle: {
              color: "black",
            },
          }}
        />

        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{
            headerShown: true,
            headerTintColor: "#ff788b",
            title: "Metick",
            headerTitleStyle: {
              color: "black",
            },
          }}
        />

        <Stack.Screen
          name="ManageAccount"
          component={ManageAccount}
          title="Manage Account"
          options={{
            headerShown: true,
            headerTintColor: "#ff788b",
            headerTitleStyle: {
              color: "black",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
