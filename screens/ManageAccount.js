//Main dependencies
import React from "react";
import { Button, View, TextInput, Text, Modal } from "react-native";
//Database
import { auth } from "../firebase";

import { signOut } from "firebase/auth";

//Styles + Images
import AppStyles from "../styles/AppStyles";

/* This function is used to manage the users account.
The users data is obtained from the firebase database, and the credentials are validated.
Once validated, the user can update their password, delete the account, or logout. */

export default function ManageAccount({ navigation }) {
  /*This function is used to sign out of the authorized users account.
  The user is then navigated to the first screen in the stack: Main.js */
  const logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
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
        Manage Account
      </Text>
      <View style={[AppStyles.manageAccountContainer]}></View>
      <View>
        <Button
          title="Update Password"
          onPress={() => navigation.navigate("ManageUpdatePassword")}
        />

        <View>
          <View style={AppStyles.formFieldSpaceBetween}>
            <Button
              title="Delete Account"
              onPress={() => navigation.navigate("ManageDeleteAccount")}
            />
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
