import React from "react";
import { View, StyleSheet } from "react-native";
import * as theme from "../../theme";

export default function Divider() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: theme.colors.gray,
    borderWidth: 1,
    marginVertical: 10,
  },
});
