import { Text, View, Button, Pressable, TextInput } from "react-native";
import AppStyles from "../styles/AppStyles";
import InlineTextSignUpButton from "../components/InlineTextSignUpButton";
import InlineTextSignUpPageButton from "../components/InlineTextSignUpPageButton";
import InlineTextResetPasswordButton from "../components/InlineTextResetPasswordButton";
import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [validationMessage, setValidationMessage] = React.useState("");

    const [focusEmailInput, setFocusEmailInput] = useState(false);
    const [focusPasswordInput, setFocusPasswordInput] = useState(false);
const [focusConfirmPasswordInput, setFocusConfirmPasswordInput]=useState(false);

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value != valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }
    setValue(value);
  };

  const signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser);
          navigation.navigate("ToDo", { user: userCredential.user });
        })
        .catch((error) => {
          setValidationMessage(error.message);

          // ..
        });
    }
  };

  return (
    <View style={AppStyles.loginContainer}>
      <Text style={AppStyles.loginHeader}>Sign Up</Text>
      <Text style={AppStyles.errorText}>{validationMessage}</Text>

      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={AppStyles.formFieldLabelText}>Email Address</Text>
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
          onChangeText={(value) =>
            validateAndSet(value, confirmPassword, setPassword)
          }
        />
      </View>

      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={AppStyles.formFieldLabelText}>Confirm Password</Text>
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
        <Pressable style={AppStyles.signUpContinueButton} onPress={signUp}>
          <Text style={AppStyles.continueText}>Continue</Text>
        </Pressable>
        <Pressable
          style={{ top: "160%", left: "43%" }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ textDecorationLine: "underline"}}>Login</Text>
        </Pressable>
      </View>

      {/* 
      <Pressable style={AppStyles.continueButton}>
        <Text style={AppStyles.continueText}>Continue</Text>
      </Pressable> */}
    </View>
  );
}
