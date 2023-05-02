import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as theme from "../theme";
import { store } from "../store";
import { TextInput } from "react-native-gesture-handler";
import { useTogglePasswordVisibility } from "../hook/useTogglePasswordVisibility";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useLayoutEffect } from "react";
import { REACT_NATIVE_APP_ENDPOINT_SERVER1 } from "@env";
import { useDispatch } from "react-redux";

export default function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const AlertPassword = () =>
    Alert.alert("Profile", "Password is empty", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const AlertAPI = () =>
    Alert.alert("Profile", "APi key is empty", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const AlertMismatch = () =>
    Alert.alert("Profile", "Password and conform password are not match", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const AlerChange = () =>
    Alert.alert("Profile", "Password is wrong", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const AlerSuccess = () =>
    Alert.alert("Profile", "Update successfully", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const [showAPIKey, setShowAPIKey] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({ clicked: false, data: "" });
  const [newpassword, setNewPassword] = useState({ clicked: false, data: "" });
  const [ada_key, setAda_key] = useState({ clicked: false, data: "" });
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
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

  const getBorderColor = (data) => {
    if (data.clicked) {
      return "rgba(39,108,186, 0.8)";
    } else {
      return "grey";
    }
  };
  return (
    <View style={styles.overview}>
      <Modal animationType="fade" transparent={false} visible={showpassword}>
        <View style={styles.general}>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: getBorderColor(password),
              marginBottom: 15,
            }}
          >
            <TextInput
              style={styles.Input_pass}
              value={password.data}
              onChangeText={(text) =>
                setPassword((previousState) => {
                  return { ...previousState, data: text };
                })
              }
              placeholder="Password"
              onBlur={() => {
                setPassword((previousState) => {
                  return { ...previousState, clicked: false };
                });
              }}
              onFocus={() => {
                setPassword((previousState) => {
                  return { ...previousState, clicked: true };
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
              <MaterialCommunityIcons
                name={rightIcon}
                size={22}
                color="#232323"
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: getBorderColor(newpassword),
              marginBottom: 15,
            }}
          >
            <TextInput
              style={styles.Input_pass}
              value={newpassword.data}
              onChangeText={(text) =>
                setNewPassword((previousState) => {
                  return { ...previousState, data: text };
                })
              }
              placeholder="New Password"
              onBlur={() => {
                setNewPassword((previousState) => {
                  return { ...previousState, clicked: false };
                });
              }}
              onFocus={() => {
                setNewPassword((previousState) => {
                  return { ...previousState, clicked: true };
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
              <MaterialCommunityIcons
                name={rightIcon}
                size={22}
                color="#232323"
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: 20,
            }}
          >
            <Pressable
              style={styles.button_handler}
              onPress={() => {
                setPassword((previousState) => {
                  return { clicked: false, data: "" };
                });
                setNewPassword((previousState) => {
                  return { clicked: false, data: "" };
                });
                setShowPassword(false);
              }}
            >
              <Text style={[styles.button_text, { color: "gray" }]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={styles.button_handler}
              onPress={() => {
                if (password.data.length == 0) AlertAPI();
                else {
                  if (newpassword.data.length == 0) AlertPassword();
                  else {
                    if (password.data != newpassword.data) AlertMismatch();
                    else {
                      const data = {
                        username: store.getState().user.username,
                        password: password.data,
                        newpassword: newpassword.data,
                      };
                      const url = `${REACT_NATIVE_APP_ENDPOINT_SERVER1}/changepass`;
                      console.log(url);
                      fetch(url, {
                        method: "PATCH",
                        body: JSON.stringify(data),
                        headers: {
                          "Content-type": "application/json",
                        },
                      })
                        .then((result) => {
                          return result.json();
                        })
                        .then((result) => {
                          if (result.message == "Wrong password!") AlerChange();
                          else {
                            AlerSuccess();
                            setPassword((previousState) => {
                              return { clicked: false, data: "" };
                            });
                            setNewPassword((previousState) => {
                              return { clicked: false, data: "" };
                            });
                            setShowPassword(false);
                          }
                        });
                    }
                  }
                }
              }}
            >
              <Text
                style={[
                  styles.button_text,
                  { color: "rgba(39,108,186, 0.8)", fontWeight: "bold" },
                ]}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={false} visible={showAPIKey}>
        <View style={styles.general}>
          <TextInput
            style={[
              styles.Input_user,
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
                return { ...previousState, clicked: false };
              });
            }}
            onFocus={() => {
              setAda_key((previousState) => {
                return { ...previousState, clicked: true };
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
              style={styles.Input_pass}
              value={password.data}
              onChangeText={(text) =>
                setPassword((previousState) => {
                  return { ...previousState, data: text };
                })
              }
              placeholder="Password"
              onBlur={() => {
                setPassword((previousState) => {
                  return { ...previousState, clicked: false };
                });
              }}
              onFocus={() => {
                setPassword((previousState) => {
                  return { ...previousState, clicked: true };
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
              <MaterialCommunityIcons
                name={rightIcon}
                size={22}
                color="#232323"
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: 20,
            }}
          >
            <Pressable
              style={styles.button_handler}
              onPress={() => {
                setPassword((previousState) => {
                  return { clicked: false, data: "" };
                });
                setAda_key((previousState) => {
                  return { clicked: false, data: "" };
                });
                setShowAPIKey(false);
              }}
            >
              <Text style={[styles.button_text, { color: "gray" }]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={styles.button_handler}
              onPress={() => {
                if (ada_key.data.length == 0) AlertAPI();
                else {
                  if (password.data.length == 0) AlertPassword();
                  else {
                    const data = {
                      username: store.getState().user.username,
                      password: password.data,
                      ada_key: ada_key.data,
                    };
                    const url = `${REACT_NATIVE_APP_ENDPOINT_SERVER1}/changeAPI`;
                    fetch(url, {
                      method: "PATCH",
                      body: JSON.stringify(data),
                      headers: {
                        "Content-type": "application/json",
                      },
                    })
                      .then((result) => {
                        return result.json();
                      })
                      .then((result) => {
                        if (result.message == "Wrong password!") AlerChange();
                        else {
                          AlerSuccess();
                          dispatch(
                            setUser({
                              username: store.getState().user.username,
                              ada_key: ada_key,
                              name: store.getState().user.name,
                              ObjectID: store.getState().user.ObjectID,
                            })
                          );
                          setPassword((previousState) => {
                            return { clicked: false, data: "" };
                          });
                          setAda_key((previousState) => {
                            return { clicked: false, data: "" };
                          });
                          setShowAPIKey(false);
                        }
                      });
                  }
                }
              }}
            >
              <Text
                style={[
                  styles.button_text,
                  { color: "rgba(39,108,186, 0.8)", fontWeight: "bold" },
                ]}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <MaterialIcons
          name="person"
          style={{
            fontSize: 200,
            color: "black",
            opacity: 0.6,
            borderColor: "rgba(0,0,0,0.6)",
            borderWidth: 1,
            borderRadius: 100,
          }}
        ></MaterialIcons>
        <Text style={styles.label}> Username </Text>
        <Text style={styles.content}> {store.getState().user.username} </Text>
        <Text style={styles.label}> API Key </Text>
        <Text style={styles.content}> {store.getState().user.ada_key} </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowPassword(true);
          }}
        >
          <Text style={styles.textButton}> Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowAPIKey(true);
          }}
        >
          <Text style={styles.textButton}> Change API Key</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overview: {
    paddingTop: 50,
  },
  container: { justifyContent: "center", alignItems: "center" },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  content: {
    fontSize: 20,
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    color: "rgba(0,0,0,0.6)",
    width: 250,
    textAlign: "center",
    borderColor: "rgba(0,0,0,0.5)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  button: {
    backgroundColor: theme.colors.base,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textButton: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  Input_pass: {
    padding: 5,
    fontSize: 20,
  },
  general: {
    padding: 40,
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  button_text: {
    fontSize: 20,
  },
  button_handler: {
    backgroundColor: "transparent",
  },
  Input_user: {
    borderBottomWidth: 2,
    padding: 5,
    marginBottom: 15,
    fontSize: 20,
  },
});
