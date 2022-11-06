//Main dependencies
import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
//Database
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
//Styles
import AppStyles from "../styles/AppStyles";
import { updateDoc } from "firebase/firestore";

/*This function checks the user’s inputted data against the firebase database credentials. 
 Failed validation displays error messages.
 Using the {navigation} prop, Successful validation navigates the user to the screen ToDo.js. 
 The user also has the option to navigate to screens: SignUp.js or ResetPassword.js. */

export default function Login({ navigation }) {
  /*Updates variable state when the corresponding function is called.
This allows user changes to be tracked and saved to memory. */
  const [errorMessage, setErrorMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  /*This state is used to toggle the border colour of the input field the user interacts with, 
showing the user pressed and unpressed states */
  const [focusEmailInput, setFocusEmailInput] = useState(false);
  const [focusPasswordInput, setFocusPasswordInput] = useState(false);

  /*This function uses firebase authentication. The email address and the password input values are checked. When they are not empty strings, user credentials are compared as a strict match against the credentials saved to the database.
Matching credentials logs the user in and navigates them to the ToDo.js screen. */
  const login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        //When the user is signed in they are navigated to ToDo.js screen.
        .then((userCredential) => {
          navigation.navigate("ToDo", { user: userCredential.user });
          // Successful login sets errorMessages + email password inputs to empty strings.
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })

        /* These conditionals are used to validate the input fields.
           The firebase error codes are obtained, and the errorMessage state is updated, to display custom error messages */
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

  /* The Text above TextInputs is a header, stating what user data is expected in the input. 
The TextInput allows the user to input email address and password data.
The two inputs have defined placeholders also stating what data the user should enter. */
  return (
    <View style={[AppStyles.screenContainer, AppStyles.centerContent]}>
      {/* This header lets the user know what screen they are on. */}
      <Text style={[AppStyles.screenHeader, AppStyles.absolutePosition]}>
        Login
      </Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Email
        </Text>

        <TextInput
          /*This ternary is used to change style of the input field the user interacts with, 
          showing the user pressed and unpressed states. */
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
        {/* This ternary is used to change style of the input field the user
        interacts with, showing the user pressed and unpressed states. */}
        <TextInput
          style={
            focusPasswordInput ? AppStyles.inputOnFocus : AppStyles.inputOnBlur
          }
          onFocus={() => setFocusPasswordInput(true)}
          onBlur={() => setFocusPasswordInput(false)}
          placeholder="Enter Password"
          //Password text input is secured as expected by the user.
          secureTextEntry={true}
          /*The password value is set to be the user input. 
          The setPassword() function is called to update the password state. */
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* The text element "continue" is pressable. When pressed, the login() function is called.
       Login() validates text inputs against credentials in the database.
       When user credentials are valid, the user is navigated to the Todo.js screen. */}

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

      {/*  The text element "Sign Up" is pressable. On press the user is navigated to the SignUp.js screen. */}
      <View>
        <Pressable
          style={AppStyles.signUpInsteadPressable}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={AppStyles.textUnderline}>Sign up</Text>
        </Pressable>
      </View>
      {/*  The text element "Reset Password" is pressable. On press the user is navigated to the ResetPassword.js  screen. */}
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
