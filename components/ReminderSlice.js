import React from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ReminderSlice = (props) => {
  const date = new Date(props.data.reminder.date);
  const title = props.data.reminder.title;
  const description = props.data.reminder.description;

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
      <View style={{ flexDirection: "column", width: 280 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            paddingRight: 10,
            paddingLeft: 5,
          }}
        >
          {title}
        </Text>
        <Text style={{ color: "gray", paddingRight: 10, paddingLeft: 5 }}>
          {description}
        </Text>
        <Text style={{ color: "gray" }}> {Format_date(date)} </Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 10,
        }}
      >
        <Pressable
          style={style.button}
          onPress={() => {
            props.deleteChange(props.data);
          }}
        >
          <MaterialIcons
            name="done"
            size={40}
            color={"rgba(39,108,186, 0.8)"}
          ></MaterialIcons>
        </Pressable>
      </View>
    </View>
  );
};

export default ReminderSlice;

const style = StyleSheet.create({
  button: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
