//Main dependencies
import React from "react";
import { Button, View, TextInput, Text } from "react-native";
//Database
import { auth, db } from "../firebase";
import {collection,query,where,getDocs,writeBatch,} from "firebase/firestore";
import {signOut, updatePassword,signInWithEmailAndPassword, deleteUser,} from "firebase/auth";
//Styles
import AppStyles from "../styles/AppStyles";

export default function ManageAccount({ navigation }) {
  let [errorMessage, setErrorMessage] = React.useState("");
  let [currentPassword, setCurrentPassword] = React.useState("");
  let [newPassword, setNewPassword] = React.useState("");

  let [focusCurrentPassword, setFocusCurrentPassword] = React.useState("");
  let [focusNewPassword, setFocusNewPassword] = React.useState("");

  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  };

  let updateUserPassword = () => {
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
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  let deleteUserAndToDos = () => {
    if (currentPassword === "") {
      setErrorMessage("Must enter current password to delete account");
    } else {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        .then((userCredential) => {
          const user = userCredential.user;

          // Get all meticks for user and batch delete
          let batch = writeBatch(db);
          const q = query(
            collection(db, "todos"),
            where("userId", "==", user.uid)
          );
          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
            batch.commit();

            deleteUser(user)
              .then(() => {
                navigation.popToTop();
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <View>
      <Text
        style={[
          AppStyles.screenHeader,
          AppStyles.margin,
          AppStyles.absolutePosition,
        ]}
      >
        Settings
      </Text>
      <View style={[AppStyles.manageAccountContainer, AppStyles.margin, AppStyles.manageAccountFormSpacing]}>
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
            onFocus={() => setFocusCurrentPassword(true)}
            onBlur={() => setFocusCurrentPassword(false)}
            placeholder="Enter Current Password"
            value={currentPassword}
            secureTextEntry={true}
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
              onFocus={() => setFocusNewPassword(true)}
              onBlur={() => setFocusNewPassword(false)}
              placeholder="Enter New Password"
              value={newPassword}
              secureTextEntry={true}
              onChangeText={setNewPassword}
            />
          </View>
        </View>
        <Button title="Update Password" onPress={updateUserPassword} />

        <View>
          <View style={AppStyles.formFieldSpaceBetween}>
            <Button title="Delete User" onPress={deleteUserAndToDos} />
          </View>
          <Button title="Logout" onPress={logout} />
          <View style={AppStyles.formFieldSpaceBetween}>
            <Button title="Back to Meticks" onPress={() => navigation.pop()} />
          </View>
        </View>
      </View>
    </View>
  );
}
