//Main dependencies
import React from "react";
import { Button, View, TextInput, Text } from "react-native";
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
//Styles
import AppStyles from "../styles/AppStyles";
import Main from "./Main";

/* This function is used to manage the users account.
The users data is obtained from the firebase database, and the credentials are validated.
Once validated, the user can update their password, delete the account, or logout. */

export default function ManageAccount({ navigation }) {
  /*Updates the state of the variables when their corresponding function is called.
This allows changes to be tracked and saved to memory. */
  const [errorMessage, setErrorMessage] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  /*This state is used to toggle the border colour of the input field the user interacts with, 
showing the user pressed and unpressed states */
  const [focusCurrentPassword, setFocusCurrentPassword] = React.useState("");
  const [focusNewPassword, setFocusNewPassword] = React.useState("");

  /*This function is used to sign out of the authorized users account.
  The user is then navigated to the first screen in the stack: Main.js */
  const logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  };

  /* This function is used to update the users password.
The currently logged in user's email and password credentials are passed into the signInWithEmailAndPassword()
 firebase method to validate the credentials. Successful validation allows the user to update their password.
After successful password update, input field states are updated to empty strings. */
  const updateUserPassword = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updatePassword(user, newPassword)
          .then(() => {
            setNewPassword("");
            setErrorMessage("");
            setCurrentPassword("");
          })
          .catch((error) => {
            //Firebase error is obtained, and displayed to the user if validation fails.
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  /* This function is used to delete a users account and saved todos.
If deletion of the user account and saved todos fails, the firebase error
is obtained and displayed.
On successful deletion the user is navigated to the first screen in the stack: Main.js */
  const deleteUserAndToDos = () => {
    /*The user cannot delete the account without entering their password.
       If the currentPassword state is an empty string a custom error message is displayed. */
    if (currentPassword === "") {
      setErrorMessage("Must enter current password to delete account");
    } else {
      /* Otherwise the currently logged in user's email and password credentials are passed into the signInWithEmailAndPassword() 
firebase method to validate the credentials. 
Once validated the user can delete the account and saved data. */
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
            batch.commit();
            // The deleteUser methods deletes the user.
            deleteUser(user)
              // When the user has been deleted, they are navigated to the screen at the top of the stack: Main.js
              .then(() => {
                navigation.popToTop();
              })
              //If there is an error deleting the user a firebase error message is obtained and the errorMessage state is updated.
              .catch((error) => {
                setErrorMessage(error.message);
              });
          });
        })
        //If there is an error deleting the saved todos, a firebase error message is obtained and the errorMessage state is updated.
        .catch((error) => {
          setErrorMessage(error.message);
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
        Settings
      </Text>
      <View
        style={[
          AppStyles.manageAccountContainer,
          AppStyles.margin,
          AppStyles.manageAccountFormSpacing,
        ]}
      >
        {/* The Text above TextInputs is a header, stating what user data is
        expected in the input. The TextInput allows the user to input current
        password and new password data. The two inputs have defined placeholders
        also stating what data the user should enter.  */}
        <View style={AppStyles.formFieldSpaceBetween}>
          <Text style={AppStyles.errorText}>{errorMessage}</Text>
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
          <View style={AppStyles.formFieldSpaceBetween}>
            <Text
              style={[AppStyles.formFieldLabelText, AppStyles.leftTextAlign]}
            >
              New Password
            </Text>
            <TextInput
              style={
                focusNewPassword
                  ? AppStyles.inputOnFocus
                  : AppStyles.inputOnBlur
              }
              /* This ternary is used to change the style of the input field the user
            interacts with, showing the user pressed and unpressed states. */
              onFocus={() => setFocusNewPassword(true)}
              onBlur={() => setFocusNewPassword(false)}
              placeholder="Enter New Password"
              value={newPassword}
              //Password text input is secured as expected by the user.
              secureTextEntry={true}
              // The setPassword() function is called to update the password state, so the value of password is the user input.
              onChangeText={setNewPassword}
            />
          </View>
          {/* When the Update Password button is pressed the updateUserPassword()
          function is called. This function obtains and validates user
          credentials so that the password can be updated. */}
        </View>
        <Button title="Update Password" onPress={updateUserPassword} />
        {/* When the Delete User button is pressed the deleteUserAndToDos() function
        is called. This function obtains and validates user credentials so that
        the user account and todo data can be deleted. */}
        <View>
          <View style={AppStyles.formFieldSpaceBetween}>
            <Button title="Delete User" onPress={deleteUserAndToDos} />
          </View>

          {/*
          When the Logout button is pressed the logout() function is called. 
           The function logs the user out and navigates the user to the first screen in the stack: Main.js*/}
          <Button title="Logout" onPress={logout} />
          <View style={AppStyles.formFieldSpaceBetween}>
            <Button title="Back to Meticks" onPress={() => navigation.pop()} />
          </View>
        </View>
      </View>
    </View>
  );
}
