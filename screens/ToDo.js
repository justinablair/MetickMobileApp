//Main dependencies
import React from "react";
import {
  View,
  Button,
  Text,
  Modal,
  Image,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Pressable,
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
//Styles + Images
import ToDoStyles from "../styles/ToDoStyles";

import wave from "../assets/wave.png";
import email from "../assets/email-icon.png";
import add from "../assets/add.png";
import settingsBlack from "../assets/settings-black.png";
import logoutIcon from "../assets/log-out.png";

export default function ToDo({ navigation }) {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [toDos, setToDos] = React.useState([]);
  let [icon, setIcon] = React.useState(true);

  let loadToDoList = async () => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  let checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, "todos", item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  let deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

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

  let showToDoList = () => {
    return (
      <View>
        <FlatList
          data={toDos}
          refreshing={isRefreshing}
          style={{
            top: 150,
            height: 350,
            backgroundColor: "white",
            flexGrow: 0,
          }}
          onRefresh={() => {
            loadToDoList();
            setIsRefreshing(true);
          }}
          renderItem={renderToDoItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  let showContent = () => {
    return (
      <View>
        <Text style={[ToDoStyles.toDoHeader, ToDoStyles.todoContainer]}>
          Welcome{" "}
        </Text>
        <Image source={wave} style={ToDoStyles.waveIcon} />
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList()}
        <View
          style={{ flexDirection: "row", top: "50%", alignItems: "center" }}
        >
          <Pressable onPress={() => navigation.navigate("ManageAccount")}>
            <View style={{ flex: 1 }}>
              <Image
                source={settingsBlack}
                style={[ToDoStyles.settingsIcon, ToDoStyles.iconDimensions]}
              />
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <View style={{ flex: 0 }}>
              <Image
                source={logoutIcon}
                style={[ToDoStyles.logoutIcon, ToDoStyles.iconDimensions]}
              />
            </View>
          </Pressable>

          {/* <Button
            title="Add Metick"
            onPress={() => setModalVisible(true)}
            color="#fb4d3d"
          /> */}
        </View>
        <Pressable
          style={{ bottom: "80%", left: "40%" }}
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
          <Button
            title="Resend Verification Email"
            onPress={() => sendEmailVerification(auth.currentUser)}
          />
        </View>
      </View>
    );
  };

  let addToDo = async (todo) => {
    let toDoToSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };

  return (
    <SafeAreaView>
      <View
        style={[
          ToDoStyles.rowContainer,
          ToDoStyles.justifyAndAlign,
          ToDoStyles.rightAligned,
          ToDoStyles.rightMargin,
          ToDoStyles.toDoTopMargin,
        ]}
      >
        {/* <InlineTextButton
          text="Manage Account"
          onPress={() => navigation.navigate("ManageAccount")}
        /> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddToDoModal
          onClose={() => setModalVisible(false)}
          addToDo={addToDo}
        />
      </Modal>

      <View
        style={{
          backgroundColor: "red",
          position: "absolute",
          top: 720,
        }}
      ></View>

      {auth.currentUser.emailVerified
        ? showContent()
        : showSendVerificationEmail()}
    </SafeAreaView>
  );
}
