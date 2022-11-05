import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,
  },

  todoContainer: {
    margin: 20,
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

  header: {
    fontSize: 20,
    alignSelf: "center",
  },

  modalHeader: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 40,
    fontWeight: "700",
  },

  toDoHeader: {
    // fontSize: 20,
    // alignSelf: "center",
    position: "absolute",
    top: 80,
    fontSize: 44,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
    width: "100%",
  },

  modalTextInput: {
    alignSelf: "stretch",
    padding: 8,
    borderBottomWidth: 2,
    marginVertical: 8,
  },

  modalDarkTextInput: {
    borderBottomColor: "#000000",
  },

  inlineTextButton: {
    color: "#000",
  },
  pressedInlineTextButton: {
    color: "#FF788B",
    opacity: 0.6,
  },

  todoOutline: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ff788b",
    backgroundColor: "white",
    width: 344,
    height: 61,
  },

  mock: {
    // position: "absolute",
    // top: 80,
    // fontSize: 44,
    // fontWeight: "700",
    // color: "#000",
    // textAlign: "left",
    // width: "100%",
    paddingTop: 150,
  },

  settingsIcon: {
    marginLeft: 20,
    width: 30,
    height: 30,
  },
  logoutIcon: {
    marginLeft: 290,
    width: 30,
    height: 30,
  },
  addIcon: {
    top: 550,
  },
  addText: {
    top: 540,
    left: 1,
    color: "black",
    fontWeight: "bold",
  },

  waveIcon: {
    marginLeft: 225,
    top: 110,
    width: 50,
    height: 50,
  },
  inputOnFocus: { borderColor: "#ff788b", borderBottomWidth: 2, width: 344 },
  inputOnBlur: { borderColor: "#A9A9A9", borderBottomWidth: 2, width: 344 },

  verifyEmailHeader: {
    top: "60%",
    width: "100%",
    fontSize: 18,
    textAlign: "center",
  },
  emailIcon: {
    top: "50%",
    marginLeft: 20,
  },

  resendEmailButton: {
    top: "50%",
  },
});
