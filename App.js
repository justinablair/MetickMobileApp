//Main dependencies 
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Screens
import Main from "./screens/Main";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ToDo from "./screens/ToDo";
import ManageAccount from "./screens/ManageAccount";
import ResetPassword from "./screens/ResetPassword";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Stack = createNativeStackNavigator();
const pink="#ff788b";

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
            headerTintColor: pink,
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
            headerTintColor: pink,
            headerTitleStyle: {
              color: "black",
            },
          }}
        />

        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerTintColor: pink,
            headerTitleStyle: {
              color: "black",
            },
          }}
        />

        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{
            headerTintColor: pink,
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
            headerTintColor: pink,
            headerTitleStyle: {
              color: "black",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
