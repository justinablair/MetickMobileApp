//Main dependencies
import React from "react";
import { Text, View, Pressable, TextInput, Modal } from "react-native";
//Database
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
//Components
import ConfirmationModal from "../components/ConfirmationModal";
//Styles + Images
import AppStyles from "../styles/AppStyles";
import Celebrate from "../assets/celebrate.png";

/* This function is used to reset the users password. 
The user is prompted to enter their email to do this.
Empty submitted input displays error messages.
Valid email input sends the user a email link to update the password.
 The user is displayed a success modal */

export default function ResetPassword({ navigation }) {
  /*Updates the state of the variables when their corresponding function is called.
This allows changes to be tracked and saved to memory.  */
  const [email, setEmail] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  /*This state is used to toggle the border colour of the input field the user interacts with, 
showing the user pressed and unpressed states */
  const [resetPasswordFocus, setResetPasswordFocus] = React.useState("");
  //Error messages are displayed when validation fails.
  const [errorMessage, setErrorMessage] = React.useState("");

  /* This function passes auth, and email into the firebase sendPasswordResetEmail() method.
  This is to validate the credentials. 
  When validation fails, firebase error messages are obtained, and custom error messages displayed.
  When credentials are valid the user is navigated to the top of the stack: Main.js */
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setModalVisible(true);
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
    // The header lets the user know what screen they are on.

    <View style={[AppStyles.screenContainer, AppStyles.centerContent]}>
      {/* Modal used to show the user success message */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        //For when android back button is pressed
        onRequestClose={() => setModalVisible(false)}
      >
        <ConfirmationModal
          title="We've emailed you a reset password link!"
          text=""
          image={Celebrate}
          onClose={() => {
            setModalVisible(false), navigation.navigate("Main");
          }}
        />
      </Modal>
      <Text style={[AppStyles.screenHeader, AppStyles.absolutePosition]}>
        Reset Password
      </Text>
      <View style={AppStyles.resetPasswordForm}>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <View style={AppStyles.formFieldSpaceBetween}>
          {/* The Text above TextInputs is a header, stating what user data is
        expected in the input. The TextInput allows the user to enter email address data. 
       The TextInput has a placeholder also stating what data the user should enter.  */}
          <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
            Email
          </Text>
          <TextInput
            style={
              resetPasswordFocus
                ? AppStyles.inputOnFocus
                : AppStyles.inputOnBlur
            }
            onFocus={() => setResetPasswordFocus(true)}
            onBlur={() => setResetPasswordFocus(false)}
            placeholder="Enter Email"
            // The onChangeText() function is called to update the email, so the value of email is the user input.
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      {/* When the user presses the "Reset Password" pressable the resetPassword() function is called. 
      This function validates the email credential before sending a reset password email.  */}
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
