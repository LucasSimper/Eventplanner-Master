import * as React from "react";
import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  query,
  child,
  get,
  orderByChild,
  equalTo,
  onValue,
  remove,
  push,
  set,
  update,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const singleEventScreenUpcoming = ({ route, navigation }) => {
  const [event, setEvent] = useState({});
  const [going, setGoing] = useState();
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  const [id, setID] = useState();
  const ID = [];

  useEffect(() => {
    setEvent(route.params.event[1]);
    setID(route.params.id);
    const eventGoing = route.params.event[1];
    //console.log(eventGoing);
    if (eventGoing.UserID.includes(user.uid)) {
      setGoing(1);
    } else {
      setGoing(2);
      //console.log("true");
    }
    /*Når vi forlader screen, tøm object*/
    return () => {
      setEvent({});
    };
  }, []);

  //useEffect(() => console.log(event), [event]);

  const getID = async () => {
    const idQuery = query(
        ref(db, "events"),
        orderByChild("Name"),
        equalTo(route.params.event[1].Name)
      );
    const idSnapshot = await get(idQuery)
        const key = Object.keys(idSnapshot.val());
        //console.log(key);
        setNotGoingFunc(key);
    }

  const setNotGoingFunc = (key) => {
    const preArray = [];
    const userArray = [];

    get(child(dbRef, `events/${key}/Going`))
      .then((snapshot) => {
        //console.log(snapshot.val());
        preArray.push.apply(preArray, snapshot.val());
        //console.log(preArray);
      })
      .then(() => {
        const index = preArray.indexOf(user.uid);
        preArray.splice(index, 1);
        //console.log(preArray);
        update(ref(db, `events/${key}`), {
          Going: preArray,
        });
      })
      .then(() => {
        get(child(dbRef, `users/${user.uid}/Going`))
        .then((snapshot) => {
          //console.log(snapshot.val());
          userArray.push.apply(userArray, snapshot.val());
          //console.log(userArray);
        })
        .then(() => {
          const index = userArray.indexOf(key);
          userArray.splice(index, 1);
          //console.log(userArray);
          update(ref(db, `users/${user.uid}`), {
            Going: userArray,
          });
          navigation.goBack();
        })
      })
  };

  const renderButton = () => {
    if (going == 1) {
      return <View></View>;
    } else {
      return (
        <View>
          <Button title="Not Going" onPress={() => getID()} />
        </View>
      );
    }
  };

  if (!event) {
    return <Text>No data</Text>;
  }

  //all content
  return (
    <View style={styles.container}>
      {Object.entries(event).map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            {/*Vores event keys navn*/}
            <Text style={styles.label}>{item[0]} </Text>
            {/*Vores event values navne */}
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        );
      })}
      {renderButton()}
    </View>
  );
};

export default singleEventScreenUpcoming;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start" },
  row: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
  },
  label: { width: 100, fontWeight: "bold" },
  value: { flex: 1 },
});
