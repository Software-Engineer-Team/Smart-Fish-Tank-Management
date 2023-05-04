import React, { useState, useLayoutEffect } from "react";
import { onConnect } from "../utils/mqtt";

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import { REACT_NATIVE_APP_ENDPOINT_SERVER1 } from "@env";
import { TextInput } from "react-native-gesture-handler";
import { Block, Text, PanSlider } from "../components";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTogglePasswordVisibility } from "../hook/useTogglePasswordVisibility";
import Spinner from "react-native-loading-spinner-overlay";
import { setUser, store } from "../store";
import { useDispatch } from "react-redux";
import * as theme from "../theme";
import { useEffect } from "react";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const isFocused = useIsFocused();

  const [username, setUsername] = useState({ clicked: false, data: "" });
  const [password, setPassword] = useState({ clicked: false, data: "" });
  const [loading, setLoading] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  useEffect(() => {
    setUsername((previousState) => {
      return { ...previousState, data: "" };
    });
    setPassword((previousState) => {
      return { ...previousState, data: "" };
    });
  }, [isFocused]);
  const AlertLogin = () =>
    Alert.alert("Login", "User or password is wrong", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const LoginHandler = () => {
    setLoading(true);
    const user = {
      username: username.data,
      password: password.data,
    };
    console.log(`${REACT_NATIVE_APP_ENDPOINT_SERVER1}/login`);
    fetch(`${REACT_NATIVE_APP_ENDPOINT_SERVER1}/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setLoading(false);
        if (result.message === "Not found") {
          AlertLogin();
        } else {
          if (result.message === "Wrong username or passowrd") AlertLogin();
          else {
            const io_key = result.user.ada_key;
            const un = result.user.username;
            onConnect({
              io_key,
              username: un,
              TPS: [`${un}/feeds/LOG`, `${un}/feeds/CMD`],
            });
            dispatch(
              setUser({
                username: un,
                ada_key: io_key,
                ObjectID: result.user._id,
              })
            );
            navigation.navigate("Dashboard", { name: "Dashboard" });
          }
        }
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  const getBorderColor = (data) => {
    if (data.clicked) {
      return "rgba(39,108,186, 0.8)";
    } else {
      return "grey";
    }
  };
  return (
    <View style={style.general}>
      <View>
        <ImageBackground
          source={require("../assets/logo.png")}
          resizeMode="contain"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          imageStyle={{
            top: -330,
            left: -53,
            width: 400,
            height: 400,
          }}
        />
      </View>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Loading..."}
        //Text style of the Spinner Text
        textStyle={style.spinnerTextStyle}
      />
      <View style={{ alignItems: "center", padding: 10 }}>
        <Text style={style.text_title}> Hi, Guest</Text>
      </View>

      <TextInput
        style={[
          style.Input_user,
          { borderBottomColor: getBorderColor(username) },
        ]}
        value={username.data}
        onChangeText={(text) =>
          setUsername((previousState) => {
            return { ...previousState, data: text };
          })
        }
        placeholder="Username"
        onBlur={() => {
          setUsername((previousState) => {
            return { ...previousState, clicked: !previousState.clicked };
          });
        }}
        onFocus={() => {
          setUsername((previousState) => {
            return { ...previousState, clicked: !previousState.clicked };
          });
        }}
      ></TextInput>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: getBorderColor(password),
          marginBottom: 15,
        }}
      >
        <TextInput
          style={style.Input_pass}
          value={password.data}
          onChangeText={(text) =>
            setPassword((previousState) => {
              return { ...previousState, data: text };
            })
          }
          placeholder="Password"
          onBlur={() => {
            setPassword((previousState) => {
              return { ...previousState, clicked: !previousState.clicked };
            });
          }}
          onFocus={() => {
            setPassword((previousState) => {
              return { ...previousState, clicked: !previousState.clicked };
            });
          }}
          secureTextEntry={passwordVisibility}
        ></TextInput>
        <Pressable
          style={{
            position: "absolute",
            right: 0,
            paddingTop: 9,
          }}
          onPress={handlePasswordVisibility}
        >
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>
      </View>
      <TouchableOpacity style={style.button} onPress={LoginHandler}>
        <Text style={style.text_button}>Login</Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", top: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={style.text_out}>Do not have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register", { name: "Register" });
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "rgba(39,108,186, 0.8)",
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  general: {
    padding: 40,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 130,
  },
  Input_user: {
    borderBottomWidth: 2,
    padding: 5,
    marginBottom: 15,
    fontSize: 20,
  },
  Input_pass: {
    padding: 5,
    fontSize: 20,
  },
  button: {
    borderWidth: 3,
    borderColor: "rgba(39,108,186, 0.8)",
    backgroundColor: "rgba(39,108,186, 0.8)",
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
  },
  text_button: {
    fontSize: 20,
    color: "white",
    padding: 5,
    fontWeight: "bold",
  },
  text_out: {
    fontSize: 15,
  },
  text_title: {
    fontSize: 30,
    color: "rgba(39,108,186, 0.8)",
    fontWeight: "bold",
    marginLeft: -10,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
