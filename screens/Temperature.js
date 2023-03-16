import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as theme from "../theme";
import { Block, Text, PanSlider } from "../components";
import settings from "../settings";

export default function Temperature() {
  const {
    params: { name, value },
  } = useRoute();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({ onPress }) => (
        <TouchableWithoutFeedback onPress={() => onPress()}>
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

  // const name = navigation.getParam("name");
  const Icon = settings[name].icon;
  const Icon1 = settings["temperatureCelsius"].icon;

  return (
    <Block flex={1} style={styles.settings}>
      <Block flex={0.5} row>
        <Block column>
          <Icon1 size={theme.sizes.font * 4} color={theme.colors.accent1} />
          <Block column>
            <Text h1>{value}</Text>
            <Text caption>Temperature</Text>
          </Block>
        </Block>
        <Block
          flex={1}
          center
          marginTop={70}
          justifyContent="flex-start"
          alignItems="center"
          height={500}
        >
          <Icon
            flex={0.5}
            size={theme.sizes.font * 10}
            color={theme.colors.accent}
            center
          />
        </Block>
      </Block>
    </Block>
  );
}
const styles = StyleSheet.create({
  settings: {
    padding: theme.sizes.base * 2,
  },
  slider: {
    justifyContent: "center",
    alignItems: "center",
  },
});
