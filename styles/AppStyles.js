//Main dependencies
import { StyleSheet } from "react-native";

/*Root colors */
const black = "#000";
const blue = "#87F1FF";
const charcoal = "#171B1B";
const white = "#ffff";
const pink = "#ff788b";
const grey = "#A9A9A9";

export default StyleSheet.create({
  /*App Containers */
  screenContainer: {
    alignItems: "left",
    backgroundColor: white,
    color: white,
    flex: 0.9,
    marginLeft: 20,
    marginRight: 20,
    overflow: "hidden",
    paddingTop: 80,
  },

  manageAccountContainer: {
    marginTop: 200,
    marginLeft: 400,
  },

  manageDeleteAccountContainer: {
    marginTop: 90,
  },

  imageContainer: {
    alignItems: "center",
    backgroundColor: white,
    flex: 1,
  },

  modalContainer: {
    borderRadius: 7,
    borderColor: grey,
    borderWidth: 1,
    backgroundColor: white,
    marginLeft: 75,
    height: 300,
    top: 320,
    width: "60%",
  },

  /*Text styles */
  textUnderline: {
    textDecorationLine: "underline",
  },
  textInput: {
    alignSelf: "stretch",
  },

  screenHeader: {
    color: black,
    fontSize: 44,
    fontWeight: "700",
    top: 80,
    width: "100%",
  },
  modalHeader: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 40,
    paddingLeft: 30,
    paddingRight: 30,
    top: 80,
    textAlign: "center",
  },

  formFieldLabelText: {
    color: black,
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 12,
  },

  black: {
    color: black,
  },
  white: {
    color: white,
  },

  continueText: {
    alignItems: "center",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 60,
    textAlign: "center",
  },

  /*Borders */
  formFieldBorder: {
    borderBottomColor: grey,
    borderBottomWidth: 2,
  },

  /*Spacing */
  margin: {
    margin: 20,
  },

  bottomMargin: {
    marginBottom: 20,
  },

  formFieldSpaceBetween: {
    marginVertical: 30,
  },
  centerContent: {
    justifyContent: "center",
  },

  absolutePosition: {
    position: "absolute",
  },

  leftTextAlign: {
    textAlign: "left",
  },

  mediumHeight: {
    height: 61,
  },

  largeWidth: {
    width: 344,
  },

  manageAccountFormSpacing: {
    top: 100,
  },

  resetPasswordForm: {
    bottom: 60,
  },

  /*Pressable and buttons */
  resetPasswordInsteadPressable: {
    left: 125,
    top: 140,
  },

  signUpInsteadPressable: {
    left: 150,
    top: 130,
  },

  loginInsteadPressable: {
    left: 150,
    top: 115,
  },

  continueButton: {
    borderRadius: 12,
    backgroundColor: pink,
    top: 540,
  },

  resetPasswordContinueButton: {
    borderRadius: 12,
    backgroundColor: pink,
    top: 450,
  },

  updatePasswordContinueButton: {
    borderRadius: 12,
    backgroundColor: pink,
    top: 170,
  },

  inlineTextButton: {
    color: blue,
  },

  mainScreenContinueButton: {
    borderRadius: 12,
    backgroundColor: pink,
    top: 720,
  },

  mainScreenSignUpButton: {
    borderRadius: 12,
    borderColor: pink,
    borderWidth: 1,
    top: 640,
  },

  signUpContinueButton: {
    borderRadius: 12,
    backgroundColor: pink,
    top: 90,
  },

  pressedInlineTextButton: {
    color: blue,
    opacity: 0.6,
  },

  exitButton: {
    bottom: 170,
    marginLeft: 170,
  },

  confirmButton: {
    padding: 15,
  },
  deleteButton: {
    color: "#007AFF",
    fontSize: 25,
    left: 160,
    top: 265,
  },

  /*Validation error text */
  errorText: {
    color: "red",
    marginTop: 1,
  },
  validationText: {
    color: "red",
    marginTop: 1,
  },

  /* State change for user typing */
  inputOnFocus: {
    borderColor: pink,
    borderBottomWidth: 2,
    width: 344,
  },

  inputOnBlur: {
    borderColor: grey,
    borderBottomWidth: 2,
    width: 344,
  },

  mainScreen: {
    backgroundColor: charcoal,
    height: "100%",
  },

  /*Images */
  notificationIcon: {
    marginBottom: 400,
    marginLeft: 22,
  },

  images: {
    height: 50,
    width: 50,
    top: 60,
    marginLeft: 95,
  },
});
