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
  REACT_NATIVE_APP_ENDPOINT_SERVER1,
} from "@env";
import { useEffect } from "react";
let url = `${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${REACT_NATIVE_APP_X_AIO_USERNAME}/feeds/tempstatus/data?X_AIO_Key=${REACT_NATIVE_APP_X_AIO_KEY}`;
import { store } from "../store";

// import { LineChart, Grid } from "react-native-svg-charts";
// import {
//   Chart,
//   Line,
//   Area,
//   HorizontalAxis,
//   VerticalAxis,
// } from "react-native-responsive-linechart";

// import * as shape from "d3-shape";

// const data1 = [
//   0, 20, 30, 25, 30, 20, 30, 25, 30, 20, 30, 25, 30, 20, 30, 25, 30, 0,
// ];
// const data2 = [
//   -87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18,
// ];

// const data = [
//   {
//     data: data1,
//     svg: { stroke: "#8800cc" },
//   },
//   {
//     data: data2,
//     svg: { stroke: "green", strokeDasharray: [6, 10] },
//   },
// ];

export default function Temperature() {
  const {
    params: { name, value },
  } = useRoute();

  const [temp, setTemp] = useState({
    labels: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
    ],
    datasets: [
      {
        data: [15],
        withDots: false,
      },
      {
        data: [50],
        withDots: false,
      },
    ],
  });
  console.log(temp);
  const horizontalLine = {
    y: 120, // Y-coordinate of the horizontal line
    color: "grey", // Color of the horizontal line
    strokeWidth: 2, // Width of the horizontal line
  };
  // const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(100, 100, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
    propsForDots: {
      r: "3",
    },
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
        tempArr.reverse();
        setTemp({
          labels: label,
          datasets: [
            {
              data: tempArr,
              color: (opacity = 0.8) => {
                return `rgba(39,108,186,${opacity})`;
              },
            },
            {
              data: [15],
              withDots: false,
            },
            {
              data: [50],
              withDots: false,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }, []);

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
      <Text>Temperature chart</Text>
      <LineChart
        data={temp}
        width={350}
        height={200}
        chartConfig={chartConfig}
        style={{
          flex: 0.8,
          paddingTop: 20,
          // marginVertical: 200,
          borderRadius: 16,
          marginLeft: -30,
        }}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withInnerLines={false}
        withOuterLines={false}
        bezier
        decorator={() => {
          return (
            <View>
              <Text
                style={{
                  position: "absolute",
                  left: 60,
                  top: horizontalLine.y - 20,
                  right: 10,
                  color: "grey",
                  opacity: 0.6,
                }}
              >
                THRESHOLD
              </Text>
              <View
                style={{
                  position: "absolute",
                  left: 60,
                  top: horizontalLine.y,
                  right: 10,
                  borderBottomWidth: horizontalLine.strokeWidth,
                  borderBottomColor: horizontalLine.color,
                  opacity: 0.6,
                }}
              />
            </View>
          );
        }}
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
