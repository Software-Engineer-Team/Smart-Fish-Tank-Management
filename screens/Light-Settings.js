import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  View,
  Switch,
} from "react-native";
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as theme from "../theme";
import { Block, Text } from "../components";
import { TOPICS, client } from "../utils/mqtt";
import { useDispatch, useSelector } from "react-redux";
import { setLight, setLightMode } from "../store";

export default function LightSettings() {
  const {
    params: { name },
  } = useRoute();

  const navigation = useNavigation();
  const light = useSelector((state) => parseInt(state.log.light, 10));
  const {
    tempA,
    tempB,
    feed,
    light_mode: isAutomic,
  } = useSelector((state) => state.cmd);
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (light >= 50) {
      return setIsEnabled(true);
    }
    setIsEnabled(false);
  }, [light]);

  const toggleSwitch = (value) => {
    dispatch(setLightMode({ light_mode: value }));
    client.publish(
      TOPICS[1],
      `${light} ${value === true ? 1 : 0} ${tempA} ${tempB} ${feed}`
    );
  };

  const sliderChange = (value) => {
    dispatch(setLight({ light: parseInt(value, 10) }));
    client.publish(
      TOPICS[1],
      `${value} ${isAutomic} ${tempA} ${tempB} ${feed}`
    );
  };

  return (
    <View style={styles.settings}>
      <View style={styles.onOffSetting}>
        <View
          style={{
            width: 80,
            height: 30,
            borderRadius: 25,
            backgroundColor: isAutomic ? "green" : "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isAutomic ? "AUTOMIC" : "MANUAL"}
          </Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#5087c6" }}
          thumbColor={isAutomic ? "#fff88e" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isAutomic}
          style={{
            transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
          }}
        />
      </View>
      <View
        style={{
          flex: 0.6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageBackground
          source={
            isEnabled
              ? require("../assets/led-on.png")
              : require("../assets/led-off.png")
          }
          style={styles.ledBackground}
          imageStyle={{
            top: -20,
            width: isEnabled ? 300 : 308,
            height: isEnabled ? 300 : 310,
          }}
          resizeMode="contain"
        >
          <Text
            style={{
              color: theme.colors.black,
              fontSize: 24,
              fontWeight: "bold",
              bottom: 60,
              left: 5,
            }}
          >
            {light}%
          </Text>
        </ImageBackground>
      </View>
      <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
        <Block row space="between">
          <Text welcome color="black">
            Light
          </Text>
          <Text welcome color="black">
            {light}%
          </Text>
        </Block>
        <Slider
          value={light}
          mininumValue={0}
          maximumValue={100}
          thumbTintColor={"#5087c6"}
          minimumTrackTintColor={"#5087c6"}
          maximumTrackTintColor={"#ccc"}
          onValueChange={sliderChange}
        />
      </Block>
    </View>
  );
}
const styles = StyleSheet.create({
  settings: {
    padding: theme.sizes.base * 2,
    flex: 1,
  },
  onOffSetting: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ledBackground: {
    width: 300,
    height: 300,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderButton: {
    fontSize: 34,
    fontWeight: "bold",
    color: "red",
    paddingHorizontal: 8,
  },
  slider: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },
  sliderFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007aff",
  },
});
