import React, { useEffect, useState } from "react";
import {
  REACT_NATIVE_APP_ENDPOINT_X_AIO_API,
  REACT_NATIVE_APP_X_AIO_USERNAME,
  REACT_NATIVE_APP_X_AIO_KEY,
  REACT_NATIVE_APP_ENDPOINT_SERVER1,
} from "@env";
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLayoutEffect } from "react";
import * as shape from "d3-shape";
import * as theme from "../theme";
import { Block, Text, ReminderSlice, ReminderView } from "../components";
// import { client, messageHandler } from "../utils/mqtt";
import { ScrollView } from "react-native-gesture-handler";
import { store } from "../store";

export default function Reminder() {
  const [today, setToday] = useState([]);
  const [other, setOther] = useState([]);

  const {
    params: { name },
  } = useRoute();

  const isFocused = useIsFocused();

  useEffect(() => {
    fetch(
      `${REACT_NATIVE_APP_ENDPOINT_SERVER1}/reminder/` +
      store.getState().user.ObjectID,
      { method: "GET" }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setToday(res.today);
        setOther(res.other);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isFocused]);

  const MarkasDone = (data) => {
    fetch(
      `${REACT_NATIVE_APP_ENDPOINT_SERVER1}/reminder/` + data.reminder._id,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        if (data.section == "Today") {
          let dataCopy = [...today];
          const id = dataCopy.indexOf(data.reminder);
          dataCopy.splice(id, 1);
          setToday(dataCopy);
        } else {
          // console.log("Hello");
          let dataCopy = [...other];
          const id = dataCopy.indexOf(data.reminder);
          dataCopy.splice(id, 1);

          setOther(dataCopy);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigation = useNavigation();
  // console.log(data);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({ onPress }) => (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <FontAwesome
            size={theme.sizes.font * 1.5}
            color={theme.colors.black}
            name="arrow-left"
          />
        </TouchableWithoutFeedback>
      ),
      headerLeftContainerStyle: {
        paddingLeft: theme.sizes.base * 2,
      },
      headerStyle: {
        borderBottomColor: "transparent",
      },
    });
  });

  return (
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          borderRadius: 30,
          backgroundColor: theme.colors.base,
          alignItems: "center",
          justifyContent: "center",
          top: Dimensions.get("window").height - 175,
          width: 60,
          height: 60,
          right: 25,
          zIndex: 1,
        }}
        onPress={() => {
          navigation.navigate("Create-reminder", {
            name: "create_reminder",
          });
        }}
      >
        <MaterialIcons
          name="add"
          style={{ fontSize: 40, color: "white" }}
        ></MaterialIcons>
      </TouchableOpacity>
      <ScrollView>
        <ReminderView
          show={true}
          title="Today"
          data={today}
          deleteChange={MarkasDone}
        ></ReminderView>
        <ReminderView
          show={true}
          title={"Unfinished tasks"}
          data={other}
          deleteChange={MarkasDone}
        ></ReminderView>
      </ScrollView>
    </View>
  );
}
