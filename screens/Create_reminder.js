import React, { useEffect, useState } from "react";
import {
  REACT_NATIVE_APP_ENDPOINT_X_AIO_API,
  REACT_NATIVE_APP_X_AIO_USERNAME,
  REACT_NATIVE_APP_X_AIO_KEY,
} from "@env";
import {
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLayoutEffect } from "react";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import * as theme from "../theme";
import { Block, Text } from "../components";
import settings from "../settings";
import { client, messageHandler } from "../utils/mqtt";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-gesture-handler";
import { Calendar } from "react-native-calendars";

export default function Create_reminder() {
  const [val, setVal] = useState("Label");
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const [mark, setMark] = useState(
    `${time.getFullYear()}-${
      time.getMonth() + 1 >= 10
        ? time.getMonth() + 1
        : "0" + (time.getMonth() + 1)
    }-${time.getDate() >= 10 ? time.getDate() : "0" + time.getDate()}`
  );
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
  const ChangeTime = (event, currentDate) => {
    setShow(!show);
    setTime(currentDate);
  };
  const onDayPress = (currentdate) => {
    date = new Date(currentdate.timestamp);
    date.setHours(time.getHours(), time.getMinutes());
    setMark(currentdate.dateString);
    setTime(date);
  };
  return (
    <View style={{ paddingTop: 10 }}>
      <TextInput
        style={style.input_text}
        placeholder="Label"
        value={text}
        fontSize={50}
        onChangeText={(text) => setText(text)}
      ></TextInput>
      <View style={style.display_time}>
        <Text style={style.display_text}>
          {time.getHours()}:{time.getMinutes()}
        </Text>
        <MaterialIcons
          name="create"
          size={40}
          paddingTop={10}
          onPress={() => {
            setShow(!show);
          }}
        ></MaterialIcons>
      </View>
      {show && (
        <DateTimePicker
          mode="time"
          display="spinner"
          is24Hour={true}
          value={time}
          onChange={ChangeTime}
        ></DateTimePicker>
      )}
      <Calendar
        style={{ paddingTop: 20 }}
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
        }}
        markedDates={{
          [mark]: {
            selected: true,
            selectedColor: `#1e90ff`,
          },
        }}
        onDayPress={onDayPress}
      ></Calendar>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 20,
        }}
      >
        <Button
          title="Cancel"
          onPress={() => {
            navigation.goBack();
          }}
        ></Button>
        <Button
          title="Save"
          onPress={() => {
            console.log("Hello");
          }}
        ></Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  input_text: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  display_time: {
    borderBottomColor: "gray",
    borderTopColor: "gray",
    borderBottomWidth: 3,
    borderTopWidth: 3,
    marginHorizontal: 60,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  display_text: {
    fontSize: 50,
    marginHorizontal: 20,
  },
});
