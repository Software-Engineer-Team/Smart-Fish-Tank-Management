import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import FeedingSlice from "./FeedingSlice";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const FeedingView = (props) => {
  return (
    <View style={style.container}>
      <ScrollView>
        {props.data.map((feeding) => {
          return (
            <FeedingSlice
              key={feeding._id}
              data={feeding}
              deleteFeeding={props.deleteFeeding}
            ></FeedingSlice>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeedingView;

const style = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
