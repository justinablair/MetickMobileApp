import { StyleSheet } from "react-native";

//Root colors for ToDo screen and modal in one place
const black = "#000";
const white = "#ffff";
const pink = "#ff788b";
const grey = "#A9A9A9";

export default StyleSheet.create({
  /*Containers */
  modalContainer: {
    backgroundColor: white,
    padding: 16,
  },

  rowContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    marginVertical: 4,
  },

  todoContainer: {
    margin: 20,
  },

  /*Text styles */
  header: {
    alignSelf: "center",
    fontSize: 20,
  },

  modalHeader: {
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 40,
    fontWeight: "700",
  },

  toDoHeader: {
    color: black,
    fontSize: 44,
    fontWeight: "700",
    position: "absolute",
    top: 80,
    textAlign: "left",
    width: "100%",
  },

  modalTextInput: {
    alignSelf: "stretch",
    borderBottomWidth: 2,
    marginVertical: 8,
    padding: 8,
  },

  modalDarkTextInput: {
    borderBottomColor: black,
  },

  addText: {
    top: 540,
    left: 1,
    color: black,
    fontWeight: "bold",
  },

  verifyEmailHeader: {
    top: "60%",
    width: "100%",
    fontSize: 18,
    textAlign: "center",
  },

  /*Spacing */
  justifyAndAlign: {
    alignItems: "center",
    justifyContent: "center",
  },

  toDoFillSpace: {
    flex: 1,
  },
  rightAligned: {
    justifyContent: "flex-end",
  },
  toDoTopMargin: {
    marginTop: 16,
  },

  toDoLeftMargin: {
    marginLeft: 16,
  },

  /*Pressable and Buttons */
  inlineTextButton: {
    color: black,
  },
  pressedInlineTextButton: {
    color: pink,
    opacity: 0.6,
  },

  resendEmailButton: {
    top: "50%",
  },

  todoOutline: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: pink,
    backgroundColor: white,
    height: 61,
    width: 344,
  },

  mock: {
    paddingTop: 150,
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

  /*Images */
  iconDimensions: {
    width: 30,
    height: 30,
  },

  settingsIcon: {
    marginLeft: 20,
  },
  logoutIcon: {
    marginLeft: 290,
  },
  addIcon: {
    top: 550,
  },

  waveIcon: {
    marginLeft: 225,
    top: 110,
    width: 50,
    height: 50,
  },

  emailIcon: {
    top: "50%",
    marginLeft: 20,
  },
});
