import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as theme from "../theme";
import { TempDisplay } from "../components";
import { useSelector } from "react-redux";

export default function Temperature() {
  const { temp1, temp2, moisture, fan, heat } = useSelector(
    (state) => state.log
  );
  console.log(temp1, temp2, moisture, fan, heat);

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
      <TempDisplay
        title="Temperature"
        text="inside the tank"
        value={Math.round(temp1 * 10) / 10}
      />
      <TempDisplay
        title="Moisture"
        text="above the tank"
        value={Math.round(moisture * 100) / 100}
      />
      <TempDisplay
        title="Heater"
        text="inside the tank"
        value={Math.round(heat * 10) / 10 === 0 ? "OFF" : "ON"}
      />
      <TempDisplay
        title="Fan"
        text="inside the tank"
        value={Math.round(fan * 10) / 10 === 0 ? "OFF" : "ON"}
      />
      <TempDisplay
        title="Temperature"
        text="outside the tank"
        value={Math.round(temp2 * 10) / 10}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    gap: 10,
    alignItems: "center",
  },
});
