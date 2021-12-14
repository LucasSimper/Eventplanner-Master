import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";


function profileScreen({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Edit Profile")}
              title="Edit Profile"
            />
          ),
        });
      }, [navigation]);

      
const auth = getAuth();
const user = auth.currentUser;


  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  if (!getAuth().currentUser) {
    return (
      <View>
        <Text>Not found</Text>
      </View>
    );
  }

  return (
    <View>
      <Image
        style={styles.avatar}
        source={{ uri: user.photoURL }}
      />
      <View style={styles.body}>
          <Text style={styles.name}> {user.displayName} </Text>
          <Text style={styles.info}> {user.email} </Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => handleLogOut()}>
          <Text>Log Out</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 1,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 80,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,

    fontWeight: "600",
    marginTop: 65,
    alignSelf: "center",
  },
  info: {
    fontSize: 16,
    marginTop: 20,
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
    alignSelf: "center",
  },
});

export default profileScreen;
