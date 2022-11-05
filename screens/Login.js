import { Text, View, Pressable, TextInput, Image } from "react-native";
import AppStyles from "../styles/AppStyles";
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Login({ navigation }) {
  // if (auth.currentUser) {
  //   navigation.navigate("ToDo");
  // } else {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.navigate("ToDo");
  //     }
  //   });
  // }

  const [errorMessage, setErrorMessage] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [focusEmailInput, setFocusEmailInput] = useState(false);
  const [focusPasswordInput, setFocusPasswordInput] = useState(false);

  let login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("ToDo", { user: userCredential.user });
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
  };
  return (
    <View style={AppStyles.loginContainer}>
      <Text style={AppStyles.loginHeader}>Login</Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={AppStyles.formFieldLabelText}>Email</Text>
        <TextInput
          // style={[AppStyles.textInput]}
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
        <Text style={AppStyles.formFieldLabelText}>Password</Text>
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

      <Pressable style={AppStyles.continueButton} onPress={login}>
        <Text style={AppStyles.continueText}>Continue</Text>
      </Pressable>

      <View>
        <Pressable
          style={{ top: "700%", left: "43%" }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={{ top: "780%", left: "36%" }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ textDecorationLine: "underline" }}>
            Reset Password
          </Text>
        </Pressable>
      </View>

      {/* <InlineTextResetPasswordButton
        text="Login"
        style={AppStyles.rowContainer}
        onPress={login}
      /> */}
    </View>
  );
}
