import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as theme from "../theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-gesture-handler";
import { store } from "../store";
import { REACT_NATIVE_APP_ENDPOINT_SERVER1 } from "@env";
import Slider from "@react-native-community/slider";
import { Block, Text } from "../components";

export default function CreateFeeding() {
  const {
    params: { name, data },
  } = useRoute();
  console.log(data);
  const arr_val = ["Low", "Low-medium", "Medium", "High-medium", "High"];
  const navigation = useNavigation();
  const [time, setTime] = useState({
    show: false,
    hour: data != undefined ? data.hour : new Date().getHours(),
    minute: data != undefined ? data.minute : new Date().getMinutes(),
  });
  const [level, setLevel] = useState(data != undefined ? data.level : 0);

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
  const ChangeTime = (event, currentDate) => {
    setTime((previousState) => {
      return {
        show: !previousState.show,
        hour: currentDate.getHours(),
        minute: currentDate.getMinutes(),
      };
    });
  };
  const sliderChange = (value) => {
    setLevel(value);
  };

  const Change = (hour, minute) => {
    let date = new Date();
    date.setHours(hour, minute);
    return date;
  };
  return (
    <View style={{ padding: 20 }}>
      <View style={style.display_time}>
        <Pressable
          onPress={() => {
            setTime((previousState) => {
              return { ...previousState, show: !previousState.show };
            });
          }}
        >
          <Text>Choose time</Text>
        </Pressable>
        <Text style={style.display_text}>
          {time.hour}:{time.minute}
        </Text>
      </View>
      <Block row space="between">
        <Text welcome color="black">
          Level
        </Text>
        <Text welcome color="black">
          {arr_val[level]}
        </Text>
      </Block>
      <Slider
        value={level}
        mininumValue={0}
        maximumValue={4}
        step={1}
        thumbTintColor={"#5087c6"}
        minimumTrackTintColor={"#5087c6"}
        maximumTrackTintColor={"#ccc"}
        onValueChange={sliderChange}
      />

      {time.show && (
        <DateTimePicker
          mode="time"
          display="spinner"
          is24Hour={true}
          value={Change(time.hour, time.minute)}
          onChange={ChangeTime}
        ></DateTimePicker>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 20,
        }}
      >
        <Pressable
          style={style.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={[style.button_text, { color: "gray" }]}>Cancel</Text>
        </Pressable>
        <Pressable
          style={style.button}
          onPress={() => {
            if (data != undefined) {
              const newFeeding = {
                id: data._id,
                user_id: "643bd5cada7a761f0332f5ce",
                hour: time.hour,
                minute: time.minute,
                level: level,
              };
              console.log(data._id);
              fetch(`${REACT_NATIVE_APP_ENDPOINT_SERVER1}/feeding`, {
                method: "PATCH",
                body: JSON.stringify(newFeeding),
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((res) => {
                  return res.json();
                })
                .then((result) => console.log(result))
                .catch((err) => console.log(err));
            } else {
              const newFeeding = {
                user_id: "643bd5cada7a761f0332f5ce",
                hour: time.hour,
                minute: time.minute,
                level: level,
              };
              console.log(newFeeding);
              fetch(`${REACT_NATIVE_APP_ENDPOINT_SERVER1}/feeding`, {
                method: "POST",
                body: JSON.stringify(newFeeding),
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((res) => {
                  return res.json();
                })
                .then((result) => console.log(result))
                .catch((err) => console.log(err));
            }
            navigation.navigate("Feeding-Setting", {
              name: "Feeding-Setting",
            });
          }}
        >
          <Text
            style={[
              style.button_text,
              { color: "rgba(39,108,186, 0.8)", fontWeight: "bold" },
            ]}
          >
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  input_text: {
    borderBottomWidth: 2,
    padding: 5,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
  },
  display_time: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  display_text: {
    fontSize: 45,
  },
  button: {
    backgroundColor: "transparent",
  },
  button_text: {
    fontSize: 20,
  },
  text_input: {
    marginLeft: 20,
    marginRight: 20,
    fontWeight: "bold",
  },
});
