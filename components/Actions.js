import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as theme from "../theme";
export default function Actions(props) {
  console.log(props.actions);
  const actionsHandler = (actions) => {
    return actions.map((a, idx) => {
      const { id, created_at, text } = a;
      return (
        <View style={styles.containerInside} key={idx}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FontAwesome
              size={theme.sizes.font * 1.8}
              color={theme.colors.blue}
              name={id !== 5 ? "user" : "fish"}
            />
            <MaterialCommunityIcons
              size={theme.sizes.font * 1.8}
              color={theme.colors.green}
              name={
                id === 4
                  ? "lightbulb-on-outline"
                  : id === 1
                    ? "fan-auto"
                    : id === 2
                      ? "sun-thermometer-outline"
                      : id === 3
                        ? "clock-outline"
                        : id === 5
                          ? "shaker-outline"
                          : "lightbulb-on-outline"
              }
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{text}</Text>
            <Text style={{ color: "#9b9b9b", fontSize: 12 }}>{created_at}</Text>
          </View>
        </View>
      );
    });
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>{actionsHandler(props.actions)}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  containerInside: {
    flexDirection: "row",
    marginTop: 2,
  },
  content: {
    flex: 4.25,
    marginLeft: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
  },
});
