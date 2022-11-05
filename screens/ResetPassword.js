//Main dependencies
import React from "react";
import { Text, View, Pressable, TextInput } from "react-native";
//Database
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
//Styles
import AppStyles from "../styles/AppStyles";

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  let resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.popToTop();
      })
      .catch((error) => {
        if (error.code == "auth/missing-email") {
          setErrorMessage("Enter an email address");
        }
        if (error.code == "auth/invalid-email") {
          setErrorMessage("Enter an valid email address: '@' followed by text");
        }
        if (error.code == "auth/user-not-found") {
          setErrorMessage(
            "This email address in not associated with an account"
          );
        }
      });
  };

  return (
    <View style={[AppStyles.screenContainer, AppStyles.centerContent]}>
      <Text style={[AppStyles.screenHeader, AppStyles.absolutePosition]}>
        Reset Password
      </Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Email
        </Text>
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.formFieldBorder,
            AppStyles.largeWidth,
          ]}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Pressable
        style={[
          AppStyles.resetPasswordContinueButton,
          AppStyles.absolutePosition,
          AppStyles.mediumHeight,
          AppStyles.largeWidth,
        ]}
        onPress={resetPassword}
      >
        <Text
          style={[
            AppStyles.continueText,
            AppStyles.largeWidth,
            AppStyles.centerContent,
            AppStyles.absolutePosition,
          ]}
        >
          Reset Password
        </Text>
      </Pressable>
    </View>
  );
}
