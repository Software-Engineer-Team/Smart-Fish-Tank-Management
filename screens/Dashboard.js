import React, { useEffect, useState } from "react";
import {
  REACT_NATIVE_APP_ENDPOINT_X_AIO_API,
  REACT_NATIVE_APP_X_AIO_USERNAME,
  REACT_NATIVE_APP_X_AIO_KEY,
} from "@env";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import * as theme from "../theme";
import { Block, Text } from "../components";
import settings from "../settings";
import { client, messageHandler } from "../utils/mqtt";

let url = `${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/temp/data?X_AIO_Key=${REACT_NATIVE_APP_X_AIO_KEY}`;

export default function Dashboard() {
  const LightIcon = settings.light.icon;
  const ACIcon = settings.ac.icon;
  const TempIcon = settings.temperature.icon;
  const FanIcon = settings.fan.icon;
  const WiFiIcon = settings["wi-fi"].icon;
  const ElectricityIcon = settings.electricity.icon;
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
    // const intervalId = setInterval(fetchData, 5000);
    // return () => clearInterval(intervalId);
    messageHandler((message) => setTemp(message));

    return () => {
      client.end();
    };
  }, []);

  return (
    <Block style={styles.dashboard}>
      <Block row style={{ paddingTop: 40, marginTop: theme.sizes.base * 2 }}>
        <Block flex={1.5} row style={{ alignItems: "flex-end" }}>
          <Text h1>{temp}</Text>
          <Text
            h1
            size={34}
            height={80}
            weight="600"
            spacing={0.1}
            color={theme.colors.accent1}
          >
            °C
          </Text>
        </Block>
        <Block flex={1} column>
          <Text caption>Temperature</Text>
          <LineChart
            yMax={100}
            yMin={0}
            data={[0, 20, 25, 15, 20, 55, 60]}
            style={{ flex: 0.8 }}
            curve={shape.curveNatural}
            svg={{ stroke: theme.colors.accent, strokeWidth: 3 }}
          />
        </Block>
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
              onPress={() => navigation.navigate("Settings", { name: "ac" })}
            >
              <Block center middle style={styles.button}>
                <ACIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["ac"].name}
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
                navigation.navigate("Settings", { name: "electricity" })
              }
            >
              <Block center middle style={styles.button}>
                <ElectricityIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["electricity"].name}
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
