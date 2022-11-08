//Main dependencies
import { View, Text, TextInput, Button, Image } from "react-native";
import React, { useState } from "react";
//Styles
import AppStyles from "../styles/AppStyles";

/*This function displays a modal to display either success of an action,
 or a warning before confirming an action */

export default function AddToDoModal(props) {
  return (
    <View style={[AppStyles.modalContainer, AppStyles.toDoFillSpace]}>
      <Text style={AppStyles.modalHeader}>{props.title}</Text>
      <Image source={props.image} style={AppStyles.images} />
      {/* This ternary is used to change style of the input field the user interacts
      with, showing the user pressed and unpressed states. */}
      <View style={AppStyles.exitButton}>
        <Button title="x" onPress={props.onClose} />
      </View>
      <View style={AppStyles.confirmButton}>
        <Button
          title={props.text}
          onPress={() => {
            props.onClose();
          }}
        />
      </View>
    </View>
  );
}
