import { View, Text, TextInput, Button } from "react-native";
import React, {useState} from "react";
import ToDoStyles from "../styles/ToDoStyles";

export default function AddToDoModal(props) {
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
