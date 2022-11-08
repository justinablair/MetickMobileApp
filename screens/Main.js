//Main dependencies
import React from "react";
import { Text, Pressable, Image, ImageBackground } from "react-native";
//Styles + Images
import AppStyles from "../styles/AppStyles";
import NotificationIcon from "../assets/notification-icon.png";

// Main.js renders and is displayed after the splash screen.

/*
This function provides the user with two pressables to interact with.
Using the  {navigation} prop, navigation actions are implemented.

On press of “I already have an account” the user is navigated to the Login.js screen.
On press of “Get Started”, the user is navigated to the SignUp.js screen.
*/

export default function Main({ navigation }) {
  //This variable is used to set the screens background image.
  const background = require("../assets/splash.png");
  return (
    <ImageBackground
      source={background}
      style={[AppStyles.imageContainer, AppStyles.centerContent]}
    >
      {/* This image indicates to the user the purpose of the app. */}
      <Image source={NotificationIcon} style={AppStyles.notificationIcon} />

      {/* On press the user is navigated to the Login.js screen. */}
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={[
          AppStyles.mainScreenSignUpButton,
          AppStyles.absolutePosition,
          AppStyles.mediumHeight,
          AppStyles.largeWidth,
        ]}
      >
        <Text
          style={[
            AppStyles.continueText,
            AppStyles.white,
            AppStyles.centerContent,
            AppStyles.absolutePosition,
            AppStyles.largeWidth,
          ]}
        >
          I already have an account
        </Text>
      </Pressable>

      {/* On press the user is navigated to the SignUp.js screen. */}
      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={[
          AppStyles.mainScreenContinueButton,
          AppStyles.absolutePosition,
          AppStyles.mediumHeight,
          AppStyles.largeWidth,
        ]}
      >
        <Text
          style={[
            AppStyles.continueText,
            AppStyles.centerContent,
            AppStyles.absolutePosition,
            AppStyles.largeWidth,
          ]}
        >
          Get Started
        </Text>
      </Pressable>
    </ImageBackground>
  );
}
