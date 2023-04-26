import React, { useEffect, useState } from "react";
import {
  REACT_NATIVE_APP_ENDPOINT_X_AIO_API,
  REACT_NATIVE_APP_X_AIO_USERNAME,
  REACT_NATIVE_APP_X_AIO_KEY,
} from "@env";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import * as theme from "../theme";
import { Block, Text } from "../components";
import settings from "../settings";
import { socket } from "../utils/socketio";
import { client, messageHandler } from "../utils/mqtt";
let url = `${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/tempstatus/data?X_AIO_Key=${REACT_NATIVE_APP_X_AIO_KEY}`;

export default function Dashboard() {
  const LightIcon = settings.light.icon;
  // const ACIcon = settings.ac.icon;
  const STATISTICSIcon = settings.statistics.icon;
  const TempIcon = settings.temperature.icon;
  const FanIcon = settings.fan.icon;
  const WiFiIcon = settings["wi-fi"].icon;
  const ReminderIcon = settings.reminder.icon;
  const [temp, setTemp] = useState(0);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          setTemp(parseInt(data[0]["value"]));
        })
        .catch((err) => console.error(err));
    };
    fetchData();
    messageHandler((message) => setTemp(message));

    return () => {
      socket.off();
      client.end();
    };
  }, []);

  return (
    <Block style={styles.dashboard}>
      <Block row style={{ paddingTop: 40, marginTop: theme.sizes.base * 2 }}>
        <ImageBackground
          source={require("../assets/logo.png")}
          resizeMode="contain"
          style={{
            height: 150,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          imageStyle={{
            top: -100,
            left: 10,
            width: 308,
            height: 310,
          }}
        />
      </Block>

      <ScrollView
        contentContainerStyle={styles.buttons}
        showsVerticalScrollIndicator={false}
      >
        <Block column space="between">
          <Block
            row
            space="around"
            style={{ marginVertical: theme.sizes.base }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Light-Settings", { name: "light" })
              }
            >
              <Block center middle style={styles.button}>
                <LightIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["light"].name}
                </Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Statistics", { name: "statistics" })
              }
            >
              <Block center middle style={styles.button}>
                <STATISTICSIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["statistics"].name}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>

          <Block
            row
            space="around"
            style={{ marginVertical: theme.sizes.base }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Temperature", {
                  name: "temperature",
                  value: temp,
                })
              }
            >
              <Block center middle style={styles.button}>
                <TempIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["temperature"].name}
                </Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Settings", { name: "fan" })}
            >
              <Block center middle style={styles.button}>
                <FanIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["fan"].name}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>

          <Block
            row
            space="around"
            style={{ marginVertical: theme.sizes.base }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Settings", { name: "wi-fi" })}
            >
              <Block center middle style={styles.button}>
                <WiFiIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["wi-fi"].name}
                </Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Reminder", { name: "reminder" })
              }
            >
              <Block center middle style={styles.button}>
                <ReminderIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["reminder"].name}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base * 2,
    marginBottom: -theme.sizes.base * 6,
    backgroundColor: theme.colors.bg,
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
  },
  button: {
    backgroundColor: theme.colors.button,
    width: 151,
    height: 151,
    borderRadius: 151 / 2,
  },
});
