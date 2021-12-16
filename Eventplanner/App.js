import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  LogBox,
  Image,
} from "react-native";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import stackNavigator from "./Screens/stackNavigator";
import SignUpForm from "./Screens/signUpForm";
import LoginForm from "./Screens/loginForm";
import { Card } from "react-native-paper";
import { getAuth } from "firebase/auth";
import stackNavigatorProfile from "./Screens/stackNavigatorProfile";
import stackNavigatorEvents from "./Screens/stackNavigatorEvents";
LogBox.ignoreAllLogs();

const firebaseConfig = {
  apiKey: "AIzaSyBD-8PCupSRRA4-EkKB1YH7iHu5tmgp-J4",
  authDomain: "eventplannerz-be6b5.firebaseapp.com",
  databaseURL:
    "https://eventplannerz-be6b5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eventplannerz-be6b5",
  storageBucket: "eventplannerz-be6b5.appspot.com",
  messagingSenderId: "1037590493568",
  appId: "1:1037590493568:web:2462f68e2cd8122fa4a965",
  measurementId: "G-YC3051JC8P",
};

export default function App() {
  if (!firebase.apps.length) {
    initializeApp(firebaseConfig);
  }

  const Tab = createBottomTabNavigator();

  const [user, setUser] = useState({ loggedIn: false });

  function onAuthStateChange(callback) {
    return getAuth().onAuthStateChanged((user) => {
      if (user) {
        callback({ loggedIn: true, user: user });
      } else {
        callback({ loggedIn: false });
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const GuestPage = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Image
          source={{
            uri: "https://cdn.discordapp.com/attachments/702799189351858220/920318075318960208/unknown.png",
          }}
          style={{ width: 180, height: 180, alignSelf: "center"}}
          resizeMode="contain"
        />

        <Text style={styles.paragraph}>
          Opret eller Login med din firebase Email
        </Text>

        <Card style={{ padding: 20 }}>
          <SignUpForm />
        </Card>

        <Card style={{ padding: 20 }}>
          <LoginForm />
        </Card>
      </KeyboardAvoidingView>
    );
  };

  if (user.loggedIn == true) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{ headerShown: false }}
            name="Home "
            component={stackNavigator}
          />
          <Tab.Screen
            options={{ headerShown: false, unmountOnBlur: true }}
            name="Upcoming Events"
            component={stackNavigatorEvents}
          />
          <Tab.Screen
            options={{ headerShown: false, unmountOnBlur: true }}
            name="Profile"
            component={stackNavigatorProfile}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return <GuestPage />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 5,
    backgroundColor: "transparent",
    padding: 15,
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
