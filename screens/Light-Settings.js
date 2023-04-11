import React, { useEffect, useState } from "react";
// import { client, messageHandler } from "../utils/mqtt";
import {
  REACT_NATIVE_APP_ENDPOINT_X_AIO_API,
  REACT_NATIVE_APP_X_AIO_USERNAME,
  REACT_NATIVE_APP_X_AIO_KEY,
} from "@env";
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
import { messageHandler } from "../utils/mqtt";
import { socket } from "../utils/socketio";
let url = `${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/lightstatus/data?X_AIO_Key=${REACT_NATIVE_APP_X_AIO_KEY}`;
let MAXIMUMVALUE = 4096;

export default function LightSettings() {
  const {
    params: { name },
  } = useRoute();

  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [brightness, setBrightness] = useState(0);

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
    const fetchData = () => {
      fetch(url)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          let bn = parseInt(((data[0].value / MAXIMUMVALUE) * 100).toFixed(2));
          setBrightness(bn);
          if (bn >= 50) {
            return setIsEnabled(true);
          }
          setIsEnabled(false);
        })
        .catch((error) => console.error(error));

      messageHandler((message) => {
        let bn = parseInt(((message / MAXIMUMVALUE) * 100).toFixed(2));
        setBrightness(bn);
        if (bn >= 50) {
          return setIsEnabled(true);
        }
        setIsEnabled(false);
      });
    };
    fetchData();

    return () => {
      socket.off();
    };
  }, []);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => {
      if (previousState) {
        setBrightness(0);
      } else {
        setBrightness(100);
      }
      return !previousState;
    });
  };

  const sliderChange = (value) => {
    setBrightness(parseInt(value, 10));
    if (brightness >= 50) {
      return setIsEnabled(true);
    }
    return setIsEnabled(false);
  };

  return (
    <View style={styles.settings}>
      <View style={styles.onOffSetting}>
        <View
          style={{
            width: 80,
            height: 30,
            borderRadius: 25,
            backgroundColor: isEnabled ? "green" : "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isEnabled ? "ON" : "OFF"}
          </Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#fff88e" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
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
            {brightness}%
          </Text>
        </ImageBackground>
      </View>
      <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
        <Block row space="between">
          <Text welcome color="black">
            Light
          </Text>
          <Text welcome color="black">
            {brightness}%
          </Text>
        </Block>
        <Slider
          value={brightness}
          mininumValue={0}
          maximumValue={100}
          thumbTintColor={theme.colors.accent}
          minimumTrackTintColor={theme.colors.accent}
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
