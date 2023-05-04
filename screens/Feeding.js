import React, { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as theme from "../theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { setFeedData, store } from "../store";
import { REACT_NATIVE_APP_ENDPOINT_SERVER1 } from "@env";
import Slider from "@react-native-community/slider";
import { Block, Text } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { client, TOPICS } from "../utils/mqtt";

export default function CreateFeeding() {
  const {
    params: { name, data },
  } = useRoute();
  const arr_val = ["Low", "Low-medium", "Medium", "High-medium", "High"];
  const navigation = useNavigation();
  const [time, setTime] = useState({
    show: false,
    hour: data !== undefined ? data.hour : new Date().getHours(),
    minute: data !== undefined ? data.minute : new Date().getMinutes(),
  });
  const [level, setLevel] = useState(data !== undefined ? data.level : 0);

  const { tempA, tempB, light_mode, light_unit, feedData } = useSelector(
    (state) => state.cmd
  );
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
  const AlertTime = () =>
    Alert.alert("Feeding", "Time have already setting", [
      // {
      //   text: "Cancel",
      //   onPress: () => console.log("Cancel Pressed"),
      //   style: "cancel",
      // },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const Change = (hour, minute) => {
    let date = new Date();
    date.setHours(hour, minute);
    return date;
  };

  const saveButtonHandler = () => {
    console.log("SAVE");
    const newFeeding = {
      id: data ? data._id : undefined,
      user_id: store.getState().user.ObjectID,
      hour: time.hour,
      minute: time.minute,
      level: level,
    };
    fetch(`${REACT_NATIVE_APP_ENDPOINT_SERVER1}/feeding`, {
      method: data ? "PATCH" : "POST",
      body: JSON.stringify(newFeeding),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (result.message === "Feeding have the same time with other!") {
          AlertTime();
        } else {
          console.log(TOPICS);
          client.publish(
            TOPICS[2],
            !data ? "5-Feeding the fish" : "3-The feeding time has been changed"
          );
          navigation.navigate("Feeding-Setting", {
            name: "Feeding-Setting",
          });
        }
      })
      .catch((err) => console.log(err));
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
          {time.hour < 10 ? "0" + time.hour : time.hour}:
          {time.minute < 10 ? "0" + time.minute : time.minute}
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
        <Pressable style={style.button} onPress={saveButtonHandler}>
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
    paddingTop: 100,
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
