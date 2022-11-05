import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     // alignItems: "center",
  //     // justifyContent: "center",
  //     backgroundColor: "white",
  //   },
  loginContainer: {
    alignItems: "left",
    justifyContent: "center",
    color: "#ffff",
    backgroundColor: "#ffff",
    flex: 0.9,
    marginLeft: 20,
    marginRight: 20,
    // width: "100%",
    // height: 844,
    overflow: "hidden",
    paddingTop: 80,
  },

  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    top: 608,
    // may remove
    alignSelf: "stretch",
    marginHorizontal: 16,
  },

  rowssContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,
  },
  rightMargin: {
    marginRight: 16,
  },
  leftMargin: {
    marginLeft: 16,
  },
  fillSpace: {
    flex: 1,
  },

  loginHeader: {
    position: "absolute",
    top: 80,
    fontSize: 44,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
    width: "100%",
  },

  settingsHeader: {
    position: "absolute",
    top: 80,
    fontSize: 44,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
    width: "100%",
    margin: 20,
  },

  formFieldLabelText: {
    // position: "absolute",
    // height: "19.8%",
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
    paddingBottom: 12,
  },
  //   formFieldPlaceholder: {
  //     fontSize: 18,
  //     color: "#A9A9A9",
  //   },
  formFieldBorder: {
    borderBottomColor: "#A9A9A9",
    borderBottomWidth: 2,
    width: 344,
  },
  formFieldBorderPink: {
    borderBottomColor: "red",
  },

  formFieldSpaceBetween: {
    marginVertical: 30,
  },

  continueButton: {
    position: "absolute",
    top: 540,
    borderRadius: 12,
    backgroundColor: "#ff788b",
    width: 344,
    height: 61,
  },
  resetPasswordContinueButton:{

    position: "absolute",
    top: 480,
    borderRadius: 12,
    backgroundColor: "#ff788b",
    width: 344,
    height: 61,
  },

  continueText: {
    position: "absolute",
    fontSize: 20,
    // left: 19,
    // fontSize: 20,
    lineHeight: 60,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 344,
  },

  pressedContinueButton: {
    opacity: 0.6,
  },
  textInput: {
    alignSelf: "stretch",
  },

  forgotYourPassword: {
    position: "absolute",
    top: 646,
    left: 104,
    fontSize: 15,
    fontWeight: "500",
    color: "#171b1b",
    textAlign: "center",
  },
  pressedManageAccountButton: {
    color: "#ff788b",
    marginTop: -260,
    padding: 3,
    marginLeft: 200,
  },
  manageAccountButton: {
    marginTop: -260,
    padding: 3,
    marginLeft: 200,
  },

  pressedLogoutButton: {
    color: "#ff788b",
    marginTop: -300,
    padding: 3,
    marginRight: 200,
  },
  logoutButton: {
    marginTop: -260,
    padding: 3,
    marginRight: 200,
  },

  inlineTextSignUpButton: {
    color: "#000",
    top: 130,
    padding: 3,
    marginLeft: 140,
  },
  pressedInlineSignUpButton: {
    color: "#ff788b",
    top: 130,
    padding: 3,
    alignItems: "center",
    marginLeft: 140,
  },
  inlineTextResetPasswordButton: {
    color: "#000",
    top: 130,
    padding: 3,
    marginLeft: 115,
  },
  pressedInlineResetPasswordButton: {
    color: "#ff788b",
    top: 130,
    padding: 3,
    alignItems: "center",
    marginLeft: 115,
  },
  // header: {
  //   position: "absolute",
  //   top: 500,
  //   fontSize: 44,
  //   fontWeight: "700",
  //   color: "#000",
  //   textAlign: "left",
  //   width: "100%",
  // },
  header: {
    fontSize: 20,
    alignSelf: "center",
  },
  //Navigation buttons on the sign up screen
  InlineTextSignUpPageButton: {
    color: "#000",
    top: 20,
    padding: 20,
    marginLeft: 115,
  },
  pressedInlineTextSignUpPageButton: {
    color: "#000",
    padding: 20,
    top: 20,
    marginLeft: 115,
  },

  //Form validation Error text
  errorText: {
    marginTop: 50,
    color: "red",
  },

  // ToDo screen Manage account
  rightAligned: {
    justifyContent: "flex-end",
  },

  stretch: {
    alignSelf: "stretch",
  },

  noPadding: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  darkTextInput: {
    borderBottomColor: "black",
  },
  inlineTextButton: {
    color: "#87F1FF",
  },
  pressedInlineTextButton: {
    color: "#87F1FF",
    opacity: 0.6,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  backArrowIcon: {
    bottom: 400,
    width: 30,
    height: 20,
  },
  inputOnFocus: { borderColor: "#ff788b", borderBottomWidth: 2, width: 344 },
  inputOnBlur: { borderColor: "#A9A9A9", borderBottomWidth: 2, width: 344 },
  mainScreen: { backgroundColor: "#171B1B", height: "100%" },
  notification: { marginBottom: "100%", marginLeft: "6%" },
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContinueButton: {
    position: "absolute",
    top: "85%",
    borderRadius: 12,
    backgroundColor: "#ff788b",
    width: 344,
    height: 61,
  },
  mainSignUpButton: {
    position: "absolute",
    top: "75%",
    borderRadius: 12,
    borderColor: "#ff788b",
    borderWidth: 1,
    width: 344,
    height: 61,
  },
  signUpContinueButton: {
    position: "absolute",
    top: "130%",
    borderRadius: 12,
    backgroundColor: "#ff788b",
    width: 344,
    height: 61,
  },

  lowPriorityButton: {
    position: "absolute",
    top: "10%",
    borderRadius: 12,
    borderColor: "#ff788b",

    width: 344,
  },

  loginInstead: {
    position: "absolute",
    top: "5%",
  },

  signUpInsteadText: {
    position: "absolute",
    top: 6,
  },
});
