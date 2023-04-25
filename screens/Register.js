import React, { useState, useLayoutEffect } from "react";
import { REACT_NATIVE_APP_ENDPOINT_SERVER1 } from "@env";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Block, Text, PanSlider } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTogglePasswordVisibility } from "../hook/useTogglePasswordVisibility";
import Spinner from "react-native-loading-spinner-overlay";

export default function Register() {
  const {
    params: { name },
  } = useRoute();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const [username, setUsername] = useState({ clicked: false, data: "" });
  const [password, setPassword] = useState({ clicked: false, data: "" });
  const [sepassword, setsePassword] = useState({ clicked: false, data: "" });
  const [ada_key, setAda_key] = useState({ clicked: false, data: "" });
  const [loading, setLoading] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const AlertRegisterFail = () =>
    Alert.alert("Register", "Username have already registered", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const AlertRegisterSuccess = () =>
    Alert.alert("Register", "Register successfully!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const AlertMismatch = () =>
    Alert.alert("Register", "Password and conform password are not match", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const AlertUsername = () =>
    Alert.alert("Register", "User is empty", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const AlertPassword = () =>
    Alert.alert("Register", "Password is empty", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const AlertAPI = () =>
    Alert.alert("Register", "APi key is empty", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const RegisterHandler = () => {
    setLoading(true);
    if (username.data.trim().length === 0) {
      setLoading(false);
      AlertUsername();
      return;
    }
    if (password.data.trim().length === 0) {
      setLoading(false);
      AlertPassword();
      return;
    }
    if (ada_key.data.trim().length === 0) {
      setLoading(false);
      AlertAPI();
      return;
    }
    const user = {
      username: username.data,
      password: password.data,
      ada_key: ada_key.data,
    };
    if (password.data !== sepassword.data) {
      setLoading(false);
      AlertMismatch();
    } else {
      fetch(`${REACT_NATIVE_APP_ENDPOINT_SERVER1}/register`, {
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
          if (result.message == "Username has already register") {
            AlertRegisterFail();
          } else {
            AlertRegisterSuccess();
            navigation.navigate("Login", { name: "Login" });
          }
          console.log(result);
        })
        .catch((err) => console.log(err));
    }
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
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: getBorderColor(sepassword),
          marginBottom: 15,
        }}
      >
        <TextInput
          style={style.Input_pass}
          value={sepassword.data}
          onChangeText={(text) =>
            setsePassword((previousState) => {
              return { ...previousState, data: text };
            })
          }
          placeholder="Confirm Password"
          onBlur={() => {
            setsePassword((previousState) => {
              return { ...previousState, clicked: !previousState.clicked };
            });
          }}
          onFocus={() => {
            setsePassword((previousState) => {
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
      <TextInput
        style={[
          style.Input_user,
          { borderBottomColor: getBorderColor(ada_key) },
        ]}
        value={ada_key.data}
        onChangeText={(text) =>
          setAda_key((previousState) => {
            return { ...previousState, data: text };
          })
        }
        placeholder="API Key"
        onBlur={() => {
          setAda_key((previousState) => {
            return { ...previousState, clicked: !previousState.clicked };
          });
        }}
        onFocus={() => {
          setAda_key((previousState) => {
            return { ...previousState, clicked: !previousState.clicked };
          });
        }}
      ></TextInput>
      <TouchableOpacity style={style.button} onPress={RegisterHandler}>
        <Text style={style.text_button}>Register</Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", top: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={style.text_out}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login", { name: "Login" });
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "rgba(39,108,186, 0.8)",
                fontWeight: "bold",
              }}
            >
              Log in
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
    // top: screenHeight / 3 - 50,
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
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
