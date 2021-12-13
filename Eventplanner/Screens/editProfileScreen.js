import React, {useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { getAuth, updateProfile } from "firebase/auth";

import { getDatabase, ref, push, set } from "firebase/database";


const auth = getAuth();
const user = auth.currentUser;

function editProfileScreen({navigation}) {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const renderButton = () => {
    return <Button onPress={() => handleSubmit()} title = "Update Profile" />; 
}

const handleSubmit = async () => {
  updateProfile(auth.currentUser, {
    displayName: displayName, 
    photoURL: photoURL
  }).then(() => {
    
  }).catch((error) => {
    // An error occurred
  });
}
return (
  <View>
    <Text style={styles.header}>New Event</Text>
    <TextInput
      placeholder="Display Name"
      value={displayName}
      onChangeText={(displayName) => setDisplayName(displayName)}
      style={styles.inputField}
    />
    <TextInput
      placeholder="ImageURL"
      value={photoURL}
      onChangeText={(photoURL) => setPhotoURL(photoURL)}
      style={styles.inputField}
    />
    {renderButton()}
    </View>
    
)}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  inputField: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 40,
  },
});

export default editProfileScreen;