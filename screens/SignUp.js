//Main dependencies
import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
//Database
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  SignInMethod,
} from "firebase/auth";
//Styles
import AppStyles from "../styles/AppStyles";

/*
This function allows the user to SignUp. The user enters their email and password credentials which are validated for good input.
If validation fails custom error messages are displayed. 
When validation passes the user credentials are saved to the firebase database and an account verification email is sent.

 The user also has the option to navigate to the screen Login.js . */

export default function SignUp({ navigation }) {
  /* Updates the state of the variables when their corresponding function is called.
This allows changes to be tracked and saved to memory.  */
  const [validationMessage, setValidationMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  /*This state is used to toggle the border colour of the input field the user interacts with, 
showing the user pressed and unpressed states */
  const [focusEmailInput, setFocusEmailInput] = useState(false);
  const [focusPasswordInput, setFocusPasswordInput] = useState(false);
  const [focusConfirmPasswordInput, setFocusConfirmPasswordInput] =
    useState(false);

  /* This function takes in three parameters, to check that the two updated passwords match.
    If they do not match a error message is displayed */
  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match");
    }
    //Updates text input value.
    setValue(value);
  };

  /* This function validates the text input fields. 
If validation fails firebase error codes are obtained, and custom error messages are displayed.
If validation is successful the firebase createUserWithEmailAndPassword() is called.
This saves the credentials to the database, and sends a account verification email.
The user is then navigated to the ToDo.js screen. */

  const signUp = () => {
    if (password === confirmPassword) {
      //When a user created the promise is handled. Giving back user credentials with the user in it.
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
    //  This header lets the user know what screen they are on.
    <View style={[AppStyles.screenContainer, AppStyles.centerContent]}>
      <Text style={[AppStyles.screenHeader, AppStyles.absolutePosition]}>
        Sign Up
      </Text>

      {/* The Text above TextInputs is a header, stating what user data is expected
      in the input. The TextInput allows the user to input email address and
      password data. The two inputs have defined placeholders also stating what
      data the user should enter.  */}
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
      {/* This title lets the user know what text input expects. */}
      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Password
        </Text>
        {/* This ternary is used to change style of the input field the user
        interacts with, showing the user pressed and unpressed states.  */}
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
      {/* This title lets the user know what text input expects. */}
      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Confirm Password
        </Text>
        {/* This ternary is used to change style of the input field the user
        interacts with, showing the user pressed and unpressed states.  */}
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

         {/* The text element "continue" is pressable. When pressed, the SignUp() function is called.
        SignUp() saves the inputted and validated credentials to the database and sends an account verification email.
      The user is then navigated to the ToDo.js screen.  */}
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

        {/* When the login pressable is clicked the user is navigated to the Login.js screen. */}
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
