import { useNavigation } from "@react-navigation/core";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import database, {
  FirebaseDatabaseTypes,
} from "@react-native-firebase/database";
import firebaseApp from "@react-native-firebase/app";
import { firebase, FirebaseAuthTypes } from "@react-native-firebase/auth";

interface ChatsScreenProps {}

const firebaseConfig = {
  apiKey: "AIzaSyBnMik9vaRhXr4t6EwMIky7DdMaj1MrK58",
  authDomain: "chattingdemo-fc909.firebaseapp.com",
  databaseURL: "https://chattingdemo-fc909-default-rtdb.firebaseio.com",
  projectId: "chattingdemo-fc909",
  storageBucket: "chattingdemo-fc909.appspot.com",
  messagingSenderId: "54525208022",
  appId: "1:54525208022:web:2c962a47873ee7e6077077",
  measurementId: "G-F0X4WJ6J6Q",
};

// const app = firebaseApp.initializeApp(firebaseConfig);
// const HARD_PASSWORD = "123456";

const ChatsScreen = memo(({}: ChatsScreenProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");

  const navigation = useNavigation();
  const { avatar, email, token, userId } = useAppSelector(
    (state: RootState) => state.userInfoReducer
  );
  console.log("avatar: ", avatar);

  const loginWithCredentials = async () => {
    const provider = firebase.auth.GoogleAuthProvider;
    const authCredential = provider.credential(token);

    const resultAuthCredentials = await firebase
      .auth()
      .signInWithCredential(authCredential);
    console.log("resultAuthCredentials: ", resultAuthCredentials);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            marginLeft: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FastImage
            source={{ uri: avatar!! }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!firebaseApp.apps.length) {
      firebaseApp.initializeApp(firebaseConfig)
    }
  }, []);

  useEffect(() => {
    // firebaseApp.initializeApp(firebaseConfig);
    console.log("useEffect: ");
    loginWithCredentials();
  }, []);

  useEffect(() => {
    database()
      .ref()
      .limitToLast(20)
      .on("child_added", (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
        console.log('received: ', JSON.stringify(snapshot.val()), userId);
        
        const { user, createdAt, text } = snapshot.val();
        const { key: id } = snapshot;
        const dateTime = new Date(createdAt);
        const message = {
          _id: id,
          createdAt: dateTime,
          text,
          user,
          received: user._id !== userId,
          sent: user._id === userId,
          image: user.photo,
        };
        setMessages((messages) => GiftedChat.append(messages, message));
      });
  }, [userId]);

  const onInputTextChanged = (text) => {
    setText(text);
  };

  const onSendMessage = () => {
    const message: IMessage = {
      sent: true,
      text,
      user: {
        _id: userId,
        name: userId,
        avatar,
      },
      createdAt: new Date().getTime()
    };
    console.log('message: ', message);
    
    database().ref().push(message);
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onInputTextChanged={onInputTextChanged}
        onSend={onSendMessage}
      />
    </View>
  );
});
export default ChatsScreen;
