import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as theme from "../theme";
import { Block, Text, PanSlider } from "../components";
import settings from "../settings";

export default function Settings() {
  const {
    params: { name },
  } = useRoute();

  const navigation = useNavigation();
  const [direction, setDirection] = useState(45);
  const [speed, setSpeed] = useState(12);
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

  return (
    <Block flex={1} style={styles.settings}>
      <Block flex={0.5} row>
        <Block column>
          <Icon size={theme.sizes.font * 4} color={theme.colors.gray2} />
          <Block flex={1.2} row style={{ alignItems: "flex-end" }}>
            <Text h1>27</Text>
            <Text h1 size={34} height={80} weight={"600"} spacing={0.1}>
              °C
            </Text>
          </Block>
          <Text caption>Temperature</Text>
        </Block>
        <Block flex={1} center>
          <PanSlider />
        </Block>
      </Block>
      <Block flex={1} style={{ paddingTop: theme.sizes.base * 2 }}>
        <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
          <Block row space="between">
            <Text welcome color="black">
              Direction
            </Text>
            <Text welcome color="black">
              {direction}
            </Text>
          </Block>
          <Slider
            value={45}
            mininumValue={0}
            maximumValue={90}
            thumbTintColor={theme.colors.accent}
            minimumTrackTintColor={theme.colors.accent}
            maximumTrackTintColor={theme.colors.gray2}
            onValueChange={(value) => setDirection(parseInt(value, 10))}
          />
        </Block>

        <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
          <Block row space="between">
            <Text welcome color="black">
              Speed
            </Text>
            <Text welcome color="black">
              {speed}
            </Text>
          </Block>
          <Slider
            value={12}
            mininumValue={0}
            maximumValue={30}
            thumbTintColor={theme.colors.accent}
            minimumTrackTintColor={theme.colors.accent}
            maximumTrackTintColor={theme.colors.gray2}
            onValueChange={(value) => setSpeed(parseInt(value, 10))}
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
  slider: {},
});
