import React, { useEffect, useState } from "react";
import { REACT_NATIVE_APP_ENDPOINT_SERVER1 } from "@env";
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLayoutEffect } from "react";
import { Text } from "react-native";
import * as shape from "d3-shape";
import * as theme from "../theme";
import { Block } from "../components";
import { client, messageHandler } from "../utils/mqtt";
import { store } from "../store";
import { FeedingView } from "../components";

export default function FeedingSetting() {
  const [feed, setFeed] = useState([]);
  const isFocused = useIsFocused();

  const {
    params: { name },
  } = useRoute();

  const DeleteFeeding = (data) => {
    const url = `${REACT_NATIVE_APP_ENDPOINT_SERVER1}/feeding/` + data._id;
    console.log(url);
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let dataCopy = [...feed];
        const id = dataCopy.indexOf(data);
        dataCopy.splice(id, 1);
        setFeed(dataCopy);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(
      `${REACT_NATIVE_APP_ENDPOINT_SERVER1}/feeding/` +
        store.getState().user.ObjectID,
      { method: "GET" }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setFeed(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isFocused]);

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
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          borderRadius: 30,
          backgroundColor: theme.colors.base,
          alignItems: "center",
          justifyContent: "center",
          top: Dimensions.get("window").height - 175,
          width: 60,
          height: 60,
          right: 25,
          zIndex: 1,
        }}
        onPress={() => {
          navigation.navigate("Feeding", {
            name: "Feeding",
          });
        }}
      >
        <MaterialIcons
          name="add"
          style={{ fontSize: 40, color: "white" }}
        ></MaterialIcons>
      </TouchableOpacity>

      <Text
        style={{
          paddingTop: 5,
          paddingLeft: 5,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {" "}
        Feeding time
      </Text>

      <FeedingView data={feed} deleteFeeding={DeleteFeeding}></FeedingView>
    </View>
  );
}
