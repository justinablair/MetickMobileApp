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
import { signInWithEmailAndPassword, deleteUser } from "firebase/auth";
//Components
import ConfirmationModal from "../components/ConfirmationModal";
//Styles + Images
import AppStyles from "../styles/AppStyles";
// import Main from "./Main";
import Eyes from "../assets/eyes.png";

/* This function is used to manage the users account.
The users data is obtained from the firebase database, and the credentials are validated.
Once validated, the user can delete the account. The user is displayed a warning modal to confirm deletion  */

export default function ManageDeleteAccount({ navigation }) {
  /*Updates the state of the variables when their corresponding function is called.
This allows changes to be tracked and saved to memory. */
  const [errorMessage, setErrorMessage] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);

  /*This state is used to toggle the border colour of the input field the user interacts with, 
showing the user pressed and unpressed states */
  const [focusCurrentPassword, setFocusCurrentPassword] = React.useState("");

  /* This function is used to delete a users account and saved todos.
If deletion of the user account and saved todos fails, the firebase error
is obtained and displayed.
On successful deletion the user is navigated to the first screen in the stack: Main.js */
  const DeleteUserAndToDos = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      //When the user is sucessfully logged in
      .then((userCredential) => {
        const user = userCredential.user;
        // The writeBatch method deletes all todos from the database.
        let batch = writeBatch(db);
        const q = query(
          collection(db, "todos"),
          where("userId", "==", user.uid)
        );
        //handles promise and adds a delete to the batch.
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
        });
        batch.commit();
        // The deleteUser methods deletes the user.
        deleteUser(user)
          // When the user has been deleted, they are navigated to the screen at the top of the stack: Main.js.
          .then(() => {
            navigation.popToTop();
          })
          //If there is an error deleting the user a firebase error message is obtained and the errorMessage state is updated.
          .catch((error) => {
            setErrorMessage(error.message);
          });
      });
  };

  const ValidatePassword = () => {
    /*The user cannot delete the account without entering their password.
       If the currentPassword state is an empty string a custom error message is displayed. */
    if (modalVisible == false) {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        //When the user is sucessfully logged in
        .then((userCredential) => {
          setModalVisible(true);
          setErrorMessage("");
          const user = userCredential.user;
        })
        //If the password is incorrect, a firebase error message is obtained and the errorMessage state is updated.
        .catch((error) => {
          if (error.code == "auth/internal-error") {
            setErrorMessage("Complete all fields");
          }
          if (error.code == "auth/wrong-password") {
            setErrorMessage("Current password is incorrect");
          }
        });
    }
  };

  return (
    <View>
      {/* This header lets the user know what screen they are on. */}
      <Text
        style={[
          AppStyles.screenHeader,
          AppStyles.margin,
          AppStyles.absolutePosition,
        ]}
      >
        Delete Account
      </Text>
      <View
        style={[
          AppStyles.manageDeleteAccountContainer,
          AppStyles.margin,
          AppStyles.manageAccountFormSpacing,
        ]}
      >
        {/* The Text above TextInputs is a header, stating what user data is
        expected in the input. The TextInput allows the user to input current
        password data. The input has a defined placeholder
        also stating what data the user should enter.  */}
        <View style={AppStyles.formFieldSpaceBetween}>
          <Text style={[AppStyles.errorText, AppStyles.bottomMargin]}>
            {errorMessage}
          </Text>
          <Text style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}>
            Current Password
          </Text>
          <TextInput
            style={
              focusCurrentPassword
                ? AppStyles.inputOnFocus
                : AppStyles.inputOnBlur
            }
            /*  This ternary is used to change the style of the input field the user
            interacts with, showing the user pressed and unpressed states. */
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
        {/* Modal used to show the user a warning to confirm the deletion */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          //For when android back button is pressed
          onRequestClose={() => setModalVisible(false)}
        >
          <ConfirmationModal
            title="This action cannot be undone"
            text=""
            image={Eyes}
            onClose={() => {
              setModalVisible(false);
            }}
          />
          <Pressable>
            <Text style={AppStyles.deleteButton} onPress={DeleteUserAndToDos}>
              Delete
            </Text>
          </Pressable>
        </Modal>

        <Pressable
          style={[
            AppStyles.updatePasswordContinueButton,
            AppStyles.absolutePosition,
            AppStyles.mediumHeight,
            AppStyles.largeWidth,
          ]}
          onPress={ValidatePassword}
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
