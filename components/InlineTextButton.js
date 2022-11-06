//Main dependencies
import { Text, Pressable } from "react-native";
//Styles
import ToDoStyles from "../styles/ToDoStyles";

/* This function allows the style of a pressable to be changed when pressed.
Props is passed in so that onPress the user can later navigate,
to another screen */
export default function InlineTextButton(props) {
  let style = {};
  if (props.color) {
    style.color = props.color;
  }
  return (
    <Pressable onPress={props.onPress}>
      {/* Styling applies if the pressable has or has not been pressed */}
      {({ pressed }) => (
        <Text
          style={[
            pressed
              ? ToDoStyles.pressedInlineTextButton
              : ToDoStyles.inlineTextButton,
            ToDoStyles.todoContainer,
            style,
          ]}
        >
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
