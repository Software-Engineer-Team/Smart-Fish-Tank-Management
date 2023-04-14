import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as theme from "../theme";
import { Block, Text, PanSlider } from "../components";
import settings from "../settings";
import { LineChart } from "react-native-chart-kit";
import {
  REACT_NATIVE_APP_ENDPOINT_X_AIO_API,
  REACT_NATIVE_APP_X_AIO_USERNAME,
  REACT_NATIVE_APP_X_AIO_KEY,
} from "@env";
import { useEffect } from "react";
let url = `${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/tempstatus/data?X_AIO_Key=${REACT_NATIVE_APP_X_AIO_KEY}`;

import { Dimensions } from "react-native";

export default function Temperature() {
  const {
    params: { name, value },
  } = useRoute();
  const [temp, setTemp] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        // strokeWidth: 2, // optional
      },
    ],
    // legend: ["Rainy Days"], // optional
  });
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    // backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(100, 100, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const navigation = useNavigation();
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
  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        label = [];
        tempArr = [];
        for (let i = 0; i < Math.min(20, res.length); i++) {
          label.push(`${i}`);
          tempArr.push(parseInt(res[i]["value"]));
        }
        setTemp({
          labels: label,
          datasets: [
            { data: tempArr },
            {
              data: [0], //highest graph value
              withDots: false, //a flage to make it hidden
            },
            {
              data: [100], //highest graph value
              withDots: false, //a flage to make it hidden
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }, []);
  // const name = navigation.getParam("name");
  const Icon = settings[name].icon;
  const Icon1 = settings["temperatureCelsius"].icon;
  console.log(value);
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
      <LineChart
        data={temp}
        width={350}
        height={200}
        chartConfig={chartConfig}
        style={{
          flex: 0.8,
          // marginVertical: 200,
          borderRadius: 16,
        }}
        withVerticalLabels={false}
        withInnerLines={false}
        withShadow={false}
      />
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
