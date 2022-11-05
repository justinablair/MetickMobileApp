import { Text, Pressable } from "react-native";
import AppStyles from "../styles/AppStyles";

export default function InlineTextSignUpPageButton(props) {
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text
          style={
            pressed
              ? AppStyles.pressedInlineTextSignUpPageButton
              : AppStyles.InlineTextSignUpPageButton
          }
        >
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
