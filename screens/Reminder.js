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

export default function Reminder() {
  const {
    params: { name },
  } = useRoute();

  const navigation = useNavigation();

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
      <Button
        title="Create new reminder"
        onPress={() => {
          navigation.navigate("Create-reminder", { name: "create_reminder" });
        }}
      ></Button>
      <ReminderView
        show={true}
        title={"Upcomming"}
        data={[
          { _id: "1", title: "Hello", date: new Date() },
          { _id: "2", title: "Hello", date: new Date() },
        ]}
        name="Up comming"
      ></ReminderView>
      <ReminderView
        show={true}
        title={"Unfinished tasks"}
        data={[
          { _id: "1", title: "Hello", date: new Date() },
          { _id: "2", title: "Hello", date: new Date() },
        ]}
        name="Up comming"
      ></ReminderView>
    </View>
  );
}
