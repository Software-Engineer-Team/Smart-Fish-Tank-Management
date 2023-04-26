import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as theme from "../theme";
import { Text } from "../components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-gesture-handler";
import { store } from "../store";
import { REACT_NATIVE_APP_ENDPOINT_SERVER1 } from "@env";

export default function Create_reminder() {
  const {
    params: { name },
  } = useRoute();

  const AlertTitle = () =>
    Alert.alert("Reminder", "Title is empty", [
      // {
      //   text: "Cancel",
      //   onPress: () => console.log("Cancel Pressed"),
      //   style: "cancel",
      // },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const AlertDescription = () =>
    Alert.alert("Reminder", "Description is empty", [
      // {
      //   text: "Cancel",
      //   onPress: () => console.log("Cancel Pressed"),
      //   style: "cancel",
      // },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const navigation = useNavigation();
  const [time, setTime] = useState({ show: false, data: new Date() });
  const [date, setDate] = useState({ show: false, data: new Date() });
  const [title, setTitle] = useState({ clicked: false, data: "" });
  const [descript, setDescript] = useState({ clicked: false, data: "" });

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
      return { show: !previousState.show, data: currentDate };
    });
  };
  const ChangeDate = (event, currentDate) => {
    setDate((previousState) => {
      return { show: !previousState.show, data: currentDate };
    });
  };
  const getBorderColor = (data) => {
    if (data.clicked) {
      return "rgba(39,108,186, 0.8)";
    } else {
      return "grey";
    }
  };
  return (
    <View style={{ paddingTop: 10 }}>
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
          {time.data.getHours()}:{time.data.getMinutes()}
        </Text>
      </View>
      <View style={style.display_time}>
        <Pressable
          onPress={() => {
            setDate((previousState) => {
              return { ...previousState, show: !previousState.show };
            });
          }}
        >
          <Text>Choose date</Text>
        </Pressable>
        <Text style={style.display_text}>
          {date.data.getDate()}/{date.data.getMonth() + 1}/
          {date.data.getFullYear()}
        </Text>
      </View>
      <Text style={[style.text_input, { color: getBorderColor(title) }]}>
        Title
      </Text>
      <TextInput
        style={[style.input_text, { borderBottomColor: getBorderColor(title) }]}
        value={title.data}
        multiline={true}
        onChangeText={(text) =>
          setTitle((previousState) => {
            return { ...previousState, data: text };
          })
        }
        onFocus={() => {
          setTitle((previousState) => {
            return { ...previousState, clicked: !previousState.clicked };
          });
        }}
        onBlur={() => {
          setTitle((previousState) => {
            return { ...previousState, clicked: !previousState.clicked };
          });
        }}
      ></TextInput>
      <Text style={[style.text_input, { color: getBorderColor(descript) }]}>
        Description
      </Text>
      <TextInput
        style={[
          style.input_text,
          { borderBottomColor: getBorderColor(descript) },
        ]}
        value={descript.data}
        multiline={true}
        onChangeText={(text) =>
          setDescript((previousState) => {
            return { ...previousState, data: text };
          })
        }
        onFocus={() => {
          setDescript((previousState) => {
            return { ...previousState, clicked: !previousState.clicked };
          });
        }}
        onBlur={() => {
          setDescript((previousState) => {
            return { ...previousState, clicked: !previousState.clicked };
          });
        }}
      ></TextInput>

      {time.show && (
        <DateTimePicker
          mode="time"
          display="spinner"
          is24Hour={true}
          value={time.data}
          onChange={ChangeTime}
        ></DateTimePicker>
      )}

      {date.show && (
        <DateTimePicker
          display="spinner"
          value={date.data}
          onChange={ChangeDate}
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
            if (title.data.trim().length === 0) {
              AlertTitle();
              return;
            }
            if (descript.data.trim().length === 0) {
              AlertDescription();
              return;
            }
            var dateStore = new Date();
            dateStore.setFullYear(
              date.data.getFullYear(),
              date.data.getMonth(),
              date.data.getDate()
            );
            dateStore.setHours(time.data.getHours(), time.data.getMinutes());

            const newReminder = {
              user_id: store.getState().user.ObjectID,
              title: title.data,
              description: descript.data,
              date: dateStore,
            };
            console.log(newReminder);
            fetch(`${REACT_NATIVE_APP_ENDPOINT_SERVER1}/reminder`, {
              method: "POST",
              body: JSON.stringify(newReminder),
              headers: {
                "Content-type": "application/json",
              },
            })
              .then((res) => {
                return res.json();
              })
              .then((result) => console.log(result))
              .catch((err) => console.log(err));

            navigation.navigate("Reminder", {
              name: "Reminder",
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
