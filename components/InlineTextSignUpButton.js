import { Text, Pressable } from "react-native";
import AppStyles from "../styles/AppStyles";

export default function InlineTextSignUpButton(props) {

  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text
          style={
            pressed
              ? AppStyles.pressedInlineSignUpButton
              : AppStyles.inlineTextSignUpButton
          }
        >
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
