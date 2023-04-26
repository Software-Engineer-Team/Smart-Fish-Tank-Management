import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as theme from "../theme";
export default function Title({ type }) {
  return (
    <View style={styles.container}>
      <Text style={styles.type}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginLeft: 10,
  },
  type: {
    color: theme.colors.black1,
    fontSize: 20,
  },
});
