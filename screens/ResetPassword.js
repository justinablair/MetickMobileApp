import { Text, View, Button, Pressable, TextInput } from "react-native";
import AppStyles from "../styles/AppStyles";
import React, { useState } from "react";
import InlineTextSignUpButton from "../components/InlineTextSignUpButton";
import InlineTextResetPasswordButton from "../components/InlineTextResetPasswordButton";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

  let resetPassword = () =>{
    sendPasswordResetEmail(auth, email)
      .then(() => {
      navigation.popToTop();
      })
      .catch((error) => {
setErrorMessage(error.message);
      });
  }

  return (
    <View style={AppStyles.loginContainer}>
      <Text style={AppStyles.loginHeader}>Reset Password</Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={AppStyles.formFieldLabelText}>Email</Text>
        <TextInput
          style={[AppStyles.textInput, AppStyles.formFieldBorder]}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Pressable
        style={AppStyles.resetPasswordContinueButton}
        onPress={resetPassword}
      >
        <Text style={AppStyles.continueText}>Reset Password</Text>
      </Pressable>
      
  
     
    </View>
  );
}
