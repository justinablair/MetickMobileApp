//Main dependencies
import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import ToDoStyles from "../styles/ToDoStyles";

/*This function displays a modal with two buttons.
The Ok button updates the state of todos.
The Cancel button closes the modal. */

export default function AddToDoModal(props) {
  /*Updates variable state when the corresponding function is called.
This allows user changes to be tracked and saved to memory. */
  let [todo, setTodo] = React.useState("");
  const [focusTodo, setFocusTodo] = useState(false);
  return (
    <View
      style={[
        ToDoStyles.modalContainer,
        ToDoStyles.justifyAndAlign,
        ToDoStyles.toDoFillSpace,
      ]}
    >
      <Text style={ToDoStyles.modalHeader}>Write a new Metick</Text>
      {/* This ternary is used to change style of the input field the user interacts
      with, showing the user pressed and unpressed states. */}
      <TextInput
        style={focusTodo ? ToDoStyles.inputOnFocus : ToDoStyles.inputOnBlur}
        onFocus={() => setFocusTodo(true)}
        onBlur={() => setFocusTodo(false)}
        placeholder="ToDo"
        value={todo}
        onChangeText={setTodo}
      />
      <View
        style={[
          ToDoStyles.rowContainer,
          ToDoStyles.justifyAndAlign,
          ToDoStyles.rightAligned,
          ToDoStyles.rightMargin,
        ]}
      >
        <Button title="Cancel" onPress={props.onClose} />
        <Button
          title="Ok"
          onPress={() => {
            props.addToDo(todo);
            setTodo("");
            props.onClose();
          }}
        />
      </View>
    </View>
  );
}
