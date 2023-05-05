import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import FeedingSlice from "./FeedingSlice";

const FeedingView = (props) => {
  return (
    <ScrollView style={style.container}>
      <View>
        {props.data.map((feeding) => {
          return (
            <FeedingSlice
              key={feeding._id}
              data={feeding}
              deleteFeeding={props.deleteFeeding}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default FeedingView;

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 40,
  },
});
