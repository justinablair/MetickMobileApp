import { Text, Pressable } from "react-native";
import AppStyles from "../styles/AppStyles";

export default function InlineTextResetPasswordButton(props) {
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text
          style={
            pressed
              ? AppStyles.pressedInlineResetPasswordButton
              : AppStyles.inlineTextResetPasswordButton
          }
        >
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
