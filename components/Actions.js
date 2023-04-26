import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
export default function Actions() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <View style={styles.containerInside}>
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
              name="user"
            />
            <MaterialCommunityIcons
              size={theme.sizes.font * 1.8}
              color={theme.colors.green}
              name="lightbulb-on-outline"
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>
              {"Pump ran according to schedule for 5s."}
            </Text>
            <Text style={{ color: "#9b9b9b", fontSize: 12 }}>
              2021-06-09 11:19:05
            </Text>
          </View>
        </View>

        <View style={styles.containerInside}>
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
              name="user"
            />
            <MaterialCommunityIcons
              size={theme.sizes.font * 1.8}
              color={theme.colors.green}
              name="thermometer-lines"
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>
              {"Pump ran according to schedule for 5s."}
            </Text>
            <Text style={{ color: "#9b9b9b", fontSize: 12 }}>
              2021-06-09 11:19:05
            </Text>
          </View>
        </View>
      </View>
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
    marginLeft: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
  },
});
