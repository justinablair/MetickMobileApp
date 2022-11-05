import { Text, Pressable } from "react-native";
import AppStyles from "../styles/AppStyles";

export default function ManageAccountButton(props) {
  const style = {};
  if (props.color) {
    style.color = props.color;
  }
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text
          style={[
            pressed
              ? AppStyles.pressedManageAccountButton
              : AppStyles.manageAccountButton,
            style,
          ]}
        >
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
