import React, { useEffect, useState } from "react";
import {
  REACT_NATIVE_APP_ENDPOINT_X_AIO_API,
  REACT_NATIVE_APP_X_AIO_USERNAME,
  REACT_NATIVE_APP_X_AIO_KEY,
} from "@env";
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useLayoutEffect } from "react";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import * as theme from "../theme";
import { Block, Text, ReminderSlice, ReminderView } from "../components";
import settings from "../settings";
import { client, messageHandler } from "../utils/mqtt";

const dummy = [
  { _id: "1", title: "Hello", date: new Date() },
  { _id: "2", title: "Hello", date: new Date() },
];

// useEffect(() => {}, []);

export default function Reminder() {
  const {
    params: { name, reminder },
  } = useRoute();

  const [data, setData] = useState(dummy);
  const MarkasDone = (reminder) => {
    let dataCopy = [...data];
    const id = dataCopy.indexOf(reminder);
    dataCopy.splice(id, 1);
    setData(dataCopy);
  };

  const navigation = useNavigation();
  console.log(data);
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
  // console.log(reminder);
  useEffect(() => {
    if (reminder) {
      const id = data.length + 1;
      let reminderCopy = { ...reminder, _id: { id } };
      let dataCopy = [...data, reminder];
      console.log(dataCopy);
      setData(dataCopy);
    }
  }, [reminder]);
  console.log(data);
  return (
    <View>
      <Button
        title="Create new reminder"
        onPress={() => {
          navigation.navigate("Create-reminder", {
            name: "create_reminder",
          });
        }}
      ></Button>
      <ReminderView
        show={true}
        title="Today"
        // data={[
        //   { _id: "1", title: "Hello", date: new Date() },
        //   { _id: "2", title: "Hello", date: new Date() },
        // ]}
        data={data}
        deleteChange={MarkasDone}
      ></ReminderView>
      {/* <View
        style={{
          marginRight: 50,
          marginLeft: 50,
          marginTop: 5,
          marginBottom: 5,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "grey",
        }}
      ></View> */}
      <ReminderView
        show={true}
        title={"Unfinished tasks"}
        // data={[
        //   { _id: "1", title: "Hello", date: new Date() },
        //   { _id: "2", title: "Hello", date: new Date() },
        // ]}
        data={data}
        deleteChange={MarkasDone}
      ></ReminderView>
    </View>
  );
}
