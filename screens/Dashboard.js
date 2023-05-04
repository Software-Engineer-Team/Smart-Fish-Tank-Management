import React, { useEffect, useState } from "react";
import {
  REACT_NATIVE_APP_ENDPOINT_X_AIO_API,
  REACT_NATIVE_APP_X_AIO_USERNAME,
} from "@env";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as shape from "d3-shape";
import * as theme from "../theme";
import { Block, Text } from "../components";
import settings from "../settings";
import { client, TOPICS } from "../utils/mqtt";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { setCmd, setLog, setUser } from "../store";

export default function Dashboard() {
  const LightIcon = settings.light.icon;
  // const ACIcon = settings.ac.icon;
  const STATISTICSIcon = settings.statistics.icon;
  const TempIcon = settings.temperature.icon;
  const ProfileIcon = settings.profile.icon;
  const FeedingIcon = settings.feeding.icon;
  const ReminderIcon = settings.reminder.icon;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { ada_key: AIO_KEY, username: AIO_USERNAME } = useSelector(
    (state) => state.user
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${AIO_USERNAME}/feeds/log/data?X_AIO_Key=${AIO_KEY}`
      )
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          const log = data[0]["value"].split(" ");

          dispatch(
            setLog({
              temp1: log[0],
              temp2: log[1],
              moisture: log[2],
              light: log[3],
              lamp: log[4],
              fan: log[5],
              heat: log[6],
              feed: log[7],
            })
          );
        })
        .catch((err) => console.error(err));

      fetch(
        `${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/cmd/data?X_AIO_Key=${AIO_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          const cmd = data[0]["value"].split(" ");
          // console.log(cmd);
          dispatch(
            setCmd({
              light_unit: cmd[0],
              light_mode: cmd[1] === "1" ? true : false,
              tempA: cmd[2],
              tempB: cmd[3],
              feed: cmd[4],
            })
          );
        })
        .catch((err) => console.log(err));
    };
    fetchData();

    client.on("message", (topic, message) => {
      console.log("Message is on " + topic + " topic");
      if (topic === TOPICS[0]) {
        const log = message.toString().split(" ");
        dispatch(
          setLog({
            temp1: log[0],
            temp2: log[1],
            moisture: log[2],
            light: log[3],
            lamp: log[4],
            fan: log[5],
            heat: log[6],
            feed: log[7],
          })
        );
      } else if (topic === TOPICS[1]) {
        const cmd = message.toString().split(" ");
        dispatch(
          setCmd({
            light_unit: cmd[0],
            light_mode: cmd[1] === "1" ? true : false,
            tempA: cmd[2],
            tempB: cmd[3],
            feed: cmd[4],
          })
        );
      }
      console.log(message.toString());
    });

    return () => {
      client.end();
    };
  }, [AIO_KEY, dispatch]);

  const Logouthandler = () => {
    dispatch(
      setUser({
        username: "",
        ada_key: "",
        name: "",
        ObjectID: "",
      })
    );
    navigation.navigate("Login");
  };

  return (
    <Block style={styles.dashboard}>
      <View style={styles.logout}>
        <TouchableOpacity onPress={Logouthandler}>
          <MaterialIcons
            name="power-settings-new"
            style={{ fontSize: 40, color: "red" }}
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
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
                navigation.navigate("Profile", { name: "Profile" })
              }
            >
              <Block center middle style={styles.button}>
                <ProfileIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["profile"].name}
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
          </Block>

          <Block
            row
            space="around"
            style={{ marginVertical: theme.sizes.base }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Feeding-Setting", {
                  name: "Feeding-Setting",
                })
              }
            >
              <Block center middle style={styles.button}>
                <FeedingIcon size={38} />
                <Text button style={{ marginTop: theme.sizes.base * 0.5 }}>
                  {settings["feeding"].name}
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
  logout: {
    position: "absolute",
    right: 20,
    top: 40,
    height: 40,
    width: 40,
  },
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
