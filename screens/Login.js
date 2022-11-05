//Main dependencies
import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
//Database
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
//Styles
import AppStyles from "../styles/AppStyles";

export default function Login({ navigation }) {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [focusEmailInput, setFocusEmailInput] = useState(false);
  const [focusPasswordInput, setFocusPasswordInput] = useState(false);

  const login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("ToDo", { user: userCredential.user });
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          if (error.code === "auth/too-many-requests") {
            setErrorMessage(
              "Account temporarily disabled due to too many failed login attempts. You can reset your password, or wait 30 minutes."
            );
          }

          if (error.code == "auth/invalid-email") {
            setErrorMessage("Enter valid email address: '@' and text after");
          }
          if (error.code == "auth/invalid-email" && "auth/wrong-password") {
            setErrorMessage("Invalid email or password");
          }
          if (error.code == "auth/wrong-password") {
            setErrorMessage("Password is incorrect");
          }
          if (error.code == "auth/internal-error") {
            setErrorMessage("Complete all fields");
          }
        });
    } else {
      setErrorMessage("Enter an email and password");
    }
  };
  return (
    <View style={[AppStyles.screenContainer, AppStyles.centerContent]}>
      <Text style={[AppStyles.screenHeader, AppStyles.absolutePosition]}>
        Login
      </Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Email
        </Text>
        <TextInput
          style={
            focusEmailInput ? AppStyles.inputOnFocus : AppStyles.inputOnBlur
          }
          onFocus={() => setFocusEmailInput(true)}
          onBlur={() => setFocusEmailInput(false)}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Password
        </Text>
        <TextInput
          style={
            focusPasswordInput ? AppStyles.inputOnFocus : AppStyles.inputOnBlur
          }
          onFocus={() => setFocusPasswordInput(true)}
          onBlur={() => setFocusPasswordInput(false)}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Pressable
        style={[
          AppStyles.continueButton,
          AppStyles.absolutePosition,
          AppStyles.mediumHeight,
          AppStyles.largeWidth,
        ]}
        onPress={login}
      >
        <Text
          style={[
            AppStyles.continueText,
            AppStyles.largeWidth,
            AppStyles.centerContent,
            AppStyles.absolutePosition,
          ]}
        >
          Continue
        </Text>
      </Pressable>

      <View>
        <Pressable
          style={AppStyles.signUpInsteadPressable}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={AppStyles.textUnderline}>Sign up</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={AppStyles.resetPasswordInsteadPressable}
          onPress={() => navigation.navigate("ResetPassword")}
        >
          <Text style={AppStyles.textUnderline}>Reset Password</Text>
        </Pressable>
      </View>
    </View>
  );
}
