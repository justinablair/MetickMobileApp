//Main dependencies
import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
//Database
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
//Styles
import AppStyles from "../styles/AppStyles";

export default function SignUp({ navigation }) {
  const [validationMessage, setValidationMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [focusEmailInput, setFocusEmailInput] = useState(false);
  const [focusPasswordInput, setFocusPasswordInput] = useState(false);
  const [focusConfirmPasswordInput, setFocusConfirmPasswordInput] =
    useState(false);

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match");
    }
    setValue(value);
  };

  const signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser);
          navigation.navigate("ToDo", { user: userCredential.user });
          setValidationMessage("");
        })
        .catch((error) => {
          if (error.code == "auth/invalid-email") {
            setValidationMessage("Set an email address and password");
          }
          if (error.code == "auth/weak-password") {
            setValidationMessage(
              "Password is weak. Enter a minimum of 6 characters"
            );
          }
          if (error.code == "auth/internal-error") {
            setValidationMessage("Complete all fields");
          }

          if (error.code == "auth/email-already-in-use") {
            setValidationMessage(
              "Email address is already in use. Use another email address or login"
            );
          }
        });
    } else {
      setValidationMessage("Please enter an email address and password");
    }
  };
  return (
    <View style={[AppStyles.screenContainer, AppStyles.centerContent]}>
      <Text style={[AppStyles.screenHeader, AppStyles.absolutePosition]}>
        Sign Up
      </Text>
      <Text style={AppStyles.validationText}>{validationMessage}</Text>

      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Email Address
        </Text>
        <TextInput
          style={
            focusEmailInput ? AppStyles.inputOnFocus : AppStyles.inputOnBlur
          }
          onFocus={() => setFocusEmailInput(true)}
          onBlur={() => setFocusEmailInput(false)}
          placeholder="Enter Email Address"
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
          onChangeText={(value) =>
            validateAndSet(value, confirmPassword, setPassword)
          }
        />
      </View>

      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Confirm Password
        </Text>
        <TextInput
          style={
            focusConfirmPasswordInput
              ? AppStyles.inputOnFocus
              : AppStyles.inputOnBlur
          }
          onFocus={() => setFocusConfirmPasswordInput(true)}
          onBlur={() => setFocusConfirmPasswordInput(false)}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(value) =>
            validateAndSet(value, password, setConfirmPassword)
          }
        />
        <Pressable
          style={[
            AppStyles.signUpContinueButton,
            AppStyles.absolutePosition,
            AppStyles.mediumHeight,
            AppStyles.largeWidth,
          ]}
          onPress={signUp}
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
        <Pressable
          style={AppStyles.loginInsteadPressable}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={AppStyles.textUnderline}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
