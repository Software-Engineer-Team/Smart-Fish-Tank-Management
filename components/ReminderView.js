import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import ReminderSlice from "./ReminderSlice";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as theme from "../theme";

const ReminderView = (props) => {
  const [show, setShow] = useState(true);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 25 }}>
          {" "}
          {props.title} ({props.data.length})
        </Text>
        {show && (
          <TouchableWithoutFeedback style={{}}>
            <MaterialIcons
              name="expand-more"
              style={{ fontSize: 30, position: "absolute", top: 5, right: 10 }}
              onPress={() => {
                setShow((show) => !show);
              }}
            ></MaterialIcons>
          </TouchableWithoutFeedback>
        )}
        {!show && (
          <TouchableWithoutFeedback style={{}}>
            <MaterialIcons
              name="expand-less"
              style={{ fontSize: 30, position: "absolute", top: 5, right: 10 }}
              onPress={() => {
                setShow((show) => !show);
              }}
            ></MaterialIcons>
          </TouchableWithoutFeedback>
        )}
      </View>

      {show && (
        <ScrollView>
          {props.data.map((reminder) => {
            // console.log(reminder);
            return (
              <ReminderSlice
                key={reminder._id}
                data={reminder}
                deleteChange={props.deleteChange}
              ></ReminderSlice>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default ReminderView;

const style = StyleSheet.create({
  button: {
    position: "relative",
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "red",
    justifyContent: "center",
    padding: 5,
  },
});
