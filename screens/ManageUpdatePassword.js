//Main dependencies
import React from "react";
import { Pressable, View, TextInput, Text, Modal } from "react-native";
//Database
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import {
  signOut,
  updatePassword,
  signInWithEmailAndPassword,
  deleteUser,
  SignInMethod,
} from "firebase/auth";
//Components
import ConfirmationModal from "../components/ConfirmationModal";

//Styles + Images
import AppStyles from "../styles/AppStyles";
import Celebrate from "../assets/celebrate.png";

/* This function is used to manage the users account.
The users data is obtained from the firebase database, and the credentials are validated.
Once validated, the user can update their password. The user is displayed a success modal */

export default function ManageUpdatePassword({ navigation }) {
  /*Updates the state of the variables when their corresponding function is called.
This allows changes to be tracked and saved to memory. */
  const [errorMessage, setErrorMessage] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  let [modalVisible, setModalVisible] = React.useState(false);

  /*This state is used to toggle the border colour of the input field the user interacts with, 
showing the user pressed and unpressed states */
  const [focusCurrentPassword, setFocusCurrentPassword] = React.useState("");
  const [focusNewPassword, setFocusNewPassword] = React.useState("");

  /* This function is used to update the users password.
The currently logged in user's email and password credentials are passed into the signInWithEmailAndPassword()
 firebase method to validate the credentials. Successful validation allows the user to update their password.
After successful password update, input field states are updated to empty strings. */
  const updateUserPassword = () => {
    if (currentPassword == "" && newPassword == "") {
      setErrorMessage("Complete all fields to continue");
    }

    if (newPassword !== "") {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          updatePassword(user, newPassword)
            .then(() => {
              setNewPassword("");
              setErrorMessage("");
              setCurrentPassword("");
              setModalVisible(true);
            })
            .catch((error) => {
           setErrorMessage(error.message)
            });
        })
        .catch((error) => {
          if (error.code == "auth/internal-error") {
            setErrorMessage("Complete all fields");
          }               if (error.code == "auth/wrong-password") {
            setErrorMessage("Current password is incorrect");
          }
          if (error.code == "auth/too-many-requests") {
            setErrorMessage(
              "Account temporarily disabled due to too many failed login attempts. You can reset your password, or wait 30 minutes."
            );
          }
          
        });
    }
  };

  return (
    <View style={[AppStyles.screenContainer, AppStyles.centerContent]}>
      {/* This header lets the user know what screen they are on. */}
      <Text style={[AppStyles.screenHeader, AppStyles.absolutePosition]}>
        Update Password
      </Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Current Password
        </Text>

        <TextInput
          /*This ternary is used to change style of the input field the user interacts with, 
          showing the user pressed and unpressed states. */
          style={
            focusCurrentPassword
              ? AppStyles.inputOnFocus
              : AppStyles.inputOnBlur
          }
          onFocus={() => setFocusCurrentPassword(true)}
          onBlur={() => setFocusCurrentPassword(false)}
          placeholder="Enter Current Password"
          value={currentPassword}
          //Password text input is secured as expected by the user.
          secureTextEntry={true}
          // The setCurrentPassword() function is called to update the password state, so the value of password is the user input.
          onChangeText={setCurrentPassword}
        />
      </View>

      <View style={AppStyles.formFieldSpaceBetween}>
        <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
          Update Password
        </Text>
        {/* This ternary is used to change style of the input field the user
        interacts with, showing the user pressed and unpressed states. */}
        <TextInput
          style={
            focusNewPassword ? AppStyles.inputOnFocus : AppStyles.inputOnBlur
          }
          onFocus={() => setFocusNewPassword(true)}
          onBlur={() => setFocusNewPassword(false)}
          placeholder="Enter New Password"
          value={newPassword}
          //Password text input is secured as expected by the user.
          secureTextEntry={true}
          // The setNewPassword() function is called to update the password state, so the value of password is the user input.
          onChangeText={setNewPassword}
        />

        <View style={[AppStyles.centerContent]}>
          {/* Modal used to show the user success message */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            //For when android back button is pressed
            onRequestClose={() => setModalVisible(false)}
          >
            <ConfirmationModal
              title="Your password has been updated!"
              text=""
              image={Celebrate}
              onClose={() => {
                setModalVisible(false), navigation.navigate("ManageAccount");
              }}
            />
          </Modal>
        </View>

        <Pressable
          style={[
            AppStyles.updatePasswordContinueButton,
            AppStyles.absolutePosition,
            AppStyles.mediumHeight,
            AppStyles.largeWidth,
          ]}
          onPress={updateUserPassword}
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
      </View>
    </View>
  );
}
