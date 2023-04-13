import React from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";

const ReminderSlice = (props) => {
  const date = new Date(props.data.reminder.date);
  const title = props.data.reminder.title;
  const Format_date = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()} ${
      month[date.getMonth()]
    } ${date.getFullYear()}, ${
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()} `;
  };
  return (
    <View style={{ flexDirection: "row", paddingLeft: 30, padding: 10 }}>
      <View style={{ borderWidth: 1, borderStyle: "solid" }}></View>
      <View>
        <Text style={{ fontSize: 20 }}> {title} </Text>
        <Text> {Format_date(date)} </Text>
      </View>
      <View
        style={{
          // position: "relative",
          // top: 10,
          // position: "relative",
          display: "flex",
          justifyContent: "center",
          paddingLeft: 80,
        }}
      >
        <Pressable
          style={style.button}
          onPress={() => {
            props.deleteChange(props.data);
          }}
        >
          <Text>MARK AS DONE</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReminderSlice;

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
