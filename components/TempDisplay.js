import React from "react";
import { StyleSheet, Text, View } from "react-native";
import settings from "../settings";

import { colors, sizes } from "../theme";

export default function TempDisplay(props) {
  const Icon =
    props.title === "Temperature"
      ? settings["light"].icon
      : props.title === "Fan"
        ? settings["ac"].icon
        : props.title === "Heater"
          ? settings["fire"].icon
          : settings["moisture"].icon;
  const Icon1 =
    props.title === "Temperature"
      ? settings["temperatureCelsius"].icon
      : props.title === "Fan" || props.title === "Heater"
        ? settings["power"].icon
        : settings["percent"].icon;

  return (
    <View style={styles.container}>
      <View style={[styles.content]}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            left: 5,
          }}
        >
          <Text style={{ fontSize: 20, marginRight: 10 }}>{props.title}</Text>

          <Icon size={sizes.font * 1.8} color={colors.white} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 60 }}>{props.value}</Text>

          <Icon1 style={{ top: -10 }} color={"red"} size={20} />
        </View>
      </View>
      <View style={styles.line} />
      <View style={[styles.content]}>
        <Text
          style={{
            color: colors.white,
            fontSize: 17,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          DISPLAY
        </Text>
        <Text
          style={{
            color: colors.white,
            fontSize: 17,
            textAlign: "center",
          }}
        >
          {props.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    backgroundColor: colors.base,
    borderRadius: 10,
    width: "90%",
    height: "30%",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    elevation: 1,
  },
  line: {
    top: 5,
    left: 10,
    width: 2,
    height: "70%",
    backgroundColor: colors.gray2,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: 130,
  },
});
