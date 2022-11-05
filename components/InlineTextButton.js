import { Text, Pressable } from "react-native";
import ToDoStyles from "../styles/ToDoStyles";

export default function InlineTextButton(props) {
  let style = {};
  if (props.color) {
    style.color = props.color;
  }
  return (
    <Pressable onPress={props.onPress}>
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
