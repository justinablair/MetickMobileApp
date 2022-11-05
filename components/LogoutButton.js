import { Text, Pressable } from "react-native";
import AppStyles from "../styles/AppStyles";

export default function LogoutButton(props) {
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text
          style={
            pressed
              ? AppStyles.pressedLogoutButton
              : AppStyles.logoutButton
          }
        >
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
