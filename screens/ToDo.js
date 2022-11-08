//Main dependencies
import React from "react";
import {
  View,
  Modal,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  Pressable,
  Button,
  SafeAreaView,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import InlineTextButton from "../components/InlineTextButton";
//Database
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
//Components
import AddToDoModal from "../components/AddToDoModal";
import ConfirmationModal from "../components/ConfirmationModal";
//Styles + Images
import ToDoStyles from "../styles/ToDoStyles";
import Celebrate from "../assets/celebrate.png";

import wave from "../assets/wave.png";
import email from "../assets/email-icon.png";
import add from "../assets/add.png";
import settingsBlack from "../assets/settings-black.png";
import logoutIcon from "../assets/log-out.png";

export default function ToDo({ navigation }) {
  /*  Updates the state of the variables when their corresponding function is called.
This allows changes to be tracked and saved to memory. */
let [confirmationModalVisible,setConfirmationModalVisible]=React.useState(false);
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);

  //The list of todos are saved to an empty array.
  let [toDos, setToDos] = React.useState([]);

  /* This function queries the database on the selection of todos.
   userId is checked to match the current users id, to load the correct documents. */
  let loadToDoList = async () => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid)
    );

    /*This function waits for the database query to be returned. 
    Each todos item and its id is pushed to the empty array of toDos */
    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    //The state of the toDos array is updated to be the list of obtained todo items from the database
    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  // If the todoList is loading, show the activity indicator and load the todo list
  if (isLoading) {
    loadToDoList();
  }

  /* This function obtains the id of todo items, so the user can check the checkbox to cross out todos. 
  This is saved to the database. */
  let checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, "todos", item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  /* This function is used to delete items from the todo list. The id of the todo that is deleted out is obtained.
  So that the correct todo is deleted. This is saved to the database */
  let deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    //Only shows existing todos, filtering out by items that are not deleted.
    let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    //Sets the toDo state to be the updated todos.
    setToDos(updatedToDos);
  };

  /* This function is used to render each todo item, so that checked todos are crossed out, and on press
  of the delete button, the todo is deleted */
  let renderToDoItem = ({ item }) => {
    return (
      <View
        style={[
          ToDoStyles.todoOutline,
          ToDoStyles.rowContainer,
          ToDoStyles.justifyAndAlign,
          ToDoStyles.rightMargin,
          ToDoStyles.toDoLeftMargin,
        ]}
      >
        {/* User can click on text or checkbox to check item off. */}
        <View style={[ToDoStyles.toDoFillSpace, ToDoStyles.todoContainer]}>
          <BouncyCheckbox
            isChecked={item.complated}
            size={25}
            fillColor="#34D1DF"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#34D1DF" }}
            onPress={(isChecked) => {
              checkToDoItem(item, isChecked);
            }}
          />
        </View>
        <InlineTextButton
          text="Delete"
          color="red"
          onPress={() => deleteToDo(item.id)}
        />
      </View>
    );
  };

  // Shows the todo list
  let showToDoList = () => {
    return (
      <View>
        <FlatList
          // Data supplied is the list of todos.
          data={toDos}
          refreshing={isRefreshing}
          style={ToDoStyles.flatListContainer}
          // Refreshes items and shows load spinner
          onRefresh={() => {
            loadToDoList();
            setIsRefreshing(true);
          }}
          renderItem={renderToDoItem}
          // Enhances performance, if there are lots of items to render.
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  /*This function shows the data associated with a validated user, 
  so that the showTodoList() function displays the toDo list and the settings and logout icons are displayed to the user. */
  let showContent = () => {
    return (
      <View>
        <Text style={[ToDoStyles.toDoHeader, ToDoStyles.todoContainer]}>
          Welcome{" "}
        </Text>
        <Image source={wave} style={ToDoStyles.waveIcon} />
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList()}
        <View style={ToDoStyles.iconAlignment}>
          <Pressable onPress={() => navigation.navigate("ManageAccount")}>
            <View style={ToDoStyles.toDoFillSpace}>
              <Image
                source={settingsBlack}
                style={[ToDoStyles.settingsIcon, ToDoStyles.iconDimensions]}
              />
            </View>
          </Pressable>
          {/* Provides user with the option to log out */}
          <Pressable onPress={() => navigation.navigate("Login")}>
            <View style={ToDoStyles.toDoZeroFillSpace}>
              <Image
                source={logoutIcon}
                style={[ToDoStyles.logoutIcon, ToDoStyles.iconDimensions]}
              />
            </View>
          </Pressable>
        </View>
        <Pressable
          style={ToDoStyles.addMetickPosition}
          onPress={() => setModalVisible(true)}
        >
          <View>
            <Image source={add} style={ToDoStyles.addIcon} />
            <Text style={[ToDoStyles.addText]}>Add Metick</Text>
          </View>
        </Pressable>
      </View>
    );
  };
  /*This function shows the content associated with an unvalidated user, 
  so that the user can only interact with the firebase sendEmailVerification() method,
   until they verify their account. This prevents any todos being added. */
  let showSendVerificationEmail = () => {
    return (
      <View>
        <View style={ToDoStyles.todoContainer}>
          <Text style={[ToDoStyles.toDoHeader]}>Verify Your Email</Text>
          <Image source={email} style={ToDoStyles.emailIcon} />
          <Text style={ToDoStyles.verifyEmailHeader}>
            We've sent you a verification link so you can start using Metick
          </Text>
        </View>
        <View style={ToDoStyles.resendEmailButton}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={confirmationModalVisible}
            //For when android back button is pressed
            onRequestClose={() => setConfirmationModalVisible(false)}
          >
            {/* Modal used to show the user success message */}
            <ConfirmationModal
              title="We've emailed you a verification link!"
              text=""
              image={Celebrate}
              onClose={() => {
                setConfirmationModalVisible(false),
                  navigation.navigate("Login");
              }}
            />
          </Modal>

          <Button
            title="Resend Verification Email"
            //Sends the authenticated user a new email link
            onPress={() => {
              sendEmailVerification(auth.currentUser),
                setConfirmationModalVisible(true);
            }}
          />
        </View>
      </View>
    );
  };
  /* This function shows all the todos added to the database.
   A shown modal allows the user to add new todo items to the database.
    All items are rendered from the database. */
  let addToDo = async (todo) => {
    let toDoToSave = {
      text: todo,
      completed: false,
      //adds user id to the todo item.
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;
    //copy of array obtained and saved todos is added to the array.
    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);
    //setTodos renders the added todo.
    setToDos(updatedToDos);
  };

  return (
    //Renders content within the safe area boundaries of a device.
    <SafeAreaView>
      <View
        style={[
          ToDoStyles.rowContainer,
          ToDoStyles.justifyAndAlign,
          ToDoStyles.rightAligned,
          ToDoStyles.rightMargin,
          ToDoStyles.toDoTopMargin,
        ]}
      ></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        //For when android back button is pressed
        onRequestClose={() => setModalVisible(false)}
      >
        <AddToDoModal
          onClose={() => setModalVisible(false)}
          addToDo={addToDo}
        />
      </Modal>

      {/* If the user is verfied showContent() is called.
       if not, showSendVerificationEmail() is called. */}
      {auth.currentUser.emailVerified
        ? showContent()
        : showSendVerificationEmail()}
    </SafeAreaView>
  );
}
