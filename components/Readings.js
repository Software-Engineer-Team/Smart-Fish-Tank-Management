import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../theme";
import moment from "moment";

export default function Readings(props) {
  const [startDate, setStartDate] = useState("");
  const [color, setColor] = useState(
    props.title === "Temperature" ? "#d98e1b" : "#69ad05"
  );
  const [data, setData] = useState({
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
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
    propsForVerticalLabels: {
      fontSize: 11,
    },
    propsForHorizontalLabels: {
      fontSize: 11,
    },
    propsForDots: {
      r: "3",
    },
  };

  useEffect(() => {
    if (props.url) {
      fetch(props.url)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          let labels = [];
          let datasets = [];
          for (let i = 0; i < Math.min(9, res.length); i++) {
            if (i === 0) {
              setStartDate(
                moment(new Date(res[i]["created_at"])).format("MMMM Do YYYY")
              );
            }
            labels.push(
              moment(new Date(res[i]["created_at"])).format("HH:mm:ss")
            );
            datasets.push(parseInt(res[i]["value"]));
          }
          datasets.reverse();
          labels.reverse();
          setData({
            labels,
            datasets: [
              {
                data: datasets,
                color: (opacity = 0.8) => {
                  return color;
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
    }
  }, [props.url, color]);
  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 21 }}>{props.title}</Text>
          <Text style={{ fontSize: 17, color: color, top: 5 }}>
            Last meatured {data.datasets[0].data.at(-1)}
            {props.ysuffix}
          </Text>
        </View>
        <Text style={{ textAlign: "center", fontSize: 15, marginTop: 10 }}>
          Showing data from: {startDate}
        </Text>
      </View>
      <LineChart
        data={data}
        width={Dimensions.get("window").width} // from react-native
        height={200}
        verticalLabelRotation={-45}
        yAxisSuffix={props.ysuffix}
        yAxisInterval={1} // optional, defaults to 1
        yLabelsOffset={6}
        xLabelsOffset={0}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
        }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
