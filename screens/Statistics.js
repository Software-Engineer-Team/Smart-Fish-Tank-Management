import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Actions from "../components/Actions";
import * as theme from "../theme";

export default function Statistics() {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.readings}>
          <Text style={{ textAlign: "center" }}>Readings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actions}>
          <Text style={{ textAlign: "center" }}>Actions</Text>
        </TouchableOpacity>
      </View>
      <Actions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  readings: {
    padding: 10,
    flex: 0.5,
    backgroundColor: "blue",
  },
  actions: {
    padding: 10,
    flex: 0.5,
  },
});
