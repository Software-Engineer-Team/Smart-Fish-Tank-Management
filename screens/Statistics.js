import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Actions from "../components/Actions";
import * as theme from "../theme";
import { Readings } from "../components";
import {
  REACT_NATIVE_APP_ENDPOINT_X_AIO_API,
  REACT_NATIVE_APP_X_AIO_USERNAME,
  REACT_NATIVE_APP_X_AIO_KEY,
} from "@env";

export default function Statistics() {
  const navigation = useNavigation();
  const [show, setShow] = useState({
    readings: true,
    actions: false,
  });

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
        <TouchableOpacity
          onPress={() => setShow({ readings: true, actions: false })}
          activeOpacity={0.8}
          style={styles.readings}
        >
          {show.readings && <View style={styles.line} />}
          <Text style={{ textAlign: "center", color: "#fff" }}>Readings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actions}
          onPress={() => setShow({ readings: false, actions: true })}
        >
          {show.actions && <View style={styles.line} />}
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            Actions
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body}>
        {show.readings ? (
          <View>
            <Readings
              title="Temperature"
              url={`${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/tempstatus/data?X_AIO_Key=${REACT_NATIVE_APP_X_AIO_KEY}`}
              ysuffix="°C"
            />
            <Readings
              title="Lighting"
              url={`${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/lightstatus/data?X_AIO_Key=${REACT_NATIVE_APP_X_AIO_KEY}`}
              ysuffix="%"
            />
          </View>
        ) : (
          <Actions />
        )}
      </ScrollView>
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
    backgroundColor: "#5087c6",
  },
  readings: {
    padding: 10,
    flex: 0.5,
  },
  actions: {
    padding: 10,
    flex: 0.5,
  },
  line: {
    position: "absolute",
    width: 197,
    bottom: 0,
    height: 2,
    backgroundColor: "#97d5ea",
  },
  body: {
    flex: 1,
  },
});
