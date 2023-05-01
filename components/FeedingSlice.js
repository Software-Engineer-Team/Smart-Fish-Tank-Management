import React from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

const FeedingSlice = (props) => {
  const navigation = useNavigation();
  const hour = props.data.hour;
  const minute = props.data.minute;
  const level = props.data.level;
  const arr_val = ["Low", "Low-medium", "Medium", "High-medium", "High"];
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        borderColor: "rgba(39,108,186, 0.8)",
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <View style={{ flexDirection: "column", width: 200 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}
        </Text>
        <Text style={{ color: "gray" }}> Level: {arr_val[level]} </Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 10,
        }}
      >
        <Pressable
          style={style.button}
          onPress={() => {
            props.deleteFeeding(props.data);
          }}
        >
          <MaterialIcons
            name="delete"
            size={40}
            color={"rgba(39,108,186, 0.8)"}
          ></MaterialIcons>
        </Pressable>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 10,
        }}
      >
        <Pressable
          style={style.button}
          onPress={() => {
            navigation.navigate("Feeding", {
              data: props.data,
              name: "Feeding",
            });
          }}
        >
          <MaterialIcons
            name="create"
            size={40}
            color={"rgba(39,108,186, 0.8)"}
          ></MaterialIcons>
        </Pressable>
      </View>
    </View>
  );
};

export default FeedingSlice;

const style = StyleSheet.create({
  button: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
});
