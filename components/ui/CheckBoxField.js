import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";
import * as theme from "../../theme";
export default function CheckBoxField({
  title,
  role,
  onChangeValueHandler,
  removeAllState,
}) {
  /* const [isChecked, setIsChecked] = useState(false); */
  return (
    <View style={styles.container}>
      <Checkbox
        disabled={false}
        value={role}
        onValueChange={(newValue) => {
          removeAllState();
          onChangeValueHandler(newValue);
        }}
        // color={role ? theme.colors.black : undefined}
        style={styles.checkbox}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 15,
    /* backgroundColor: "blue", */
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: theme.colors.gray,
    fontSize: 15,
    marginLeft: 10,
  },
  checkbox: {
    borderRadius: 3,
    borderColor: "#00cb2c",
  },
});
