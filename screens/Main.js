import {
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import AppStyles from "../styles/AppStyles";
import React from "react";

import Notification from "../assets/notification.png";


export default function Main({ navigation }) {

  const background = require("../assets/splash.png");
  return (
    <ImageBackground source={background} style={AppStyles.imageContainer}>
      <Image source={Notification} style={AppStyles.notification} />

      <Pressable onPress={() => navigation.navigate("Login")} style={AppStyles.mainSignUpButton} >
        <Text style={AppStyles.continueText}>I already have an account</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("SignUp")} style={AppStyles.mainContinueButton}>
        <Text style={AppStyles.continueText}>Get Started</Text>
      </Pressable>

      <View></View>

      {/* <InlineTextResetPasswordButton
        text="Login"
        style={AppStyles.rowContainer}
        onPress={login}
      /> */}
    </ImageBackground>
  );
}
