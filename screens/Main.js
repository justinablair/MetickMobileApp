//Main dependencies
import React from "react";
import { Text, View, Pressable, Image, ImageBackground } from "react-native";
//Styles + Images
import AppStyles from "../styles/AppStyles";
import NotificationIcon from "../assets/notification-icon.png";

export default function Main({ navigation }) {
  const background = require("../assets/splash.png");
  return (
    <ImageBackground
      source={background}
      style={[AppStyles.imageContainer, AppStyles.centerContent]}
    >
      <Image source={NotificationIcon} style={AppStyles.notificationIcon} />

      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={[
          AppStyles.mainScreenSignUpButton,
          AppStyles.absolutePosition,
          AppStyles.mediumHeight,
          AppStyles.largeWidth
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
          I already have an account
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={[
          AppStyles.mainScreenContinueButton,
          AppStyles.absolutePosition,
          AppStyles.mediumHeight,
          AppStyles.largeWidth
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
