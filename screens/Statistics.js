import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Actions from "../components/Actions";
import * as theme from "../theme";
import { Readings } from "../components";
import { REACT_NATIVE_APP_ENDPOINT_X_AIO_API } from "@env";
import { useSelector } from "react-redux";
import moment from "moment";

export default function Statistics() {
  const navigation = useNavigation();
  const [show, setShow] = useState({
    readings: true,
    actions: false,
  });

  const { ada_key: AIO_KEY, username: AIO_USERNAME } = useSelector(
    (state) => state.user
  );
  const [actions, setActions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [labels, setLabels] = useState([]);

  const [dataSets, setDataSets] = useState({
    temp1: [],
    temp2: [],
    moisture: [],
    light: [],
  });
  const LIMIT = 9;
  const URL_LOG = `${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${AIO_USERNAME}/feeds/log/data?X_AIO_Key=${AIO_KEY}&limit=${LIMIT}`;
  const URL_ACTIVITY = `${REACT_NATIVE_APP_ENDPOINT_X_AIO_API}/${AIO_USERNAME}/feeds/log-activity/data?X_AIO_Key=${AIO_KEY}`;

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
    fetch(URL_LOG)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const labels_data = [];
        const datasets_temp1 = [];
        const datasets_temp2 = [];
        const datasets_light = [];
        const datasets_moisture = [];
        for (let i = 0; i < LIMIT && res.length > 0; i++) {
          if (i === 0) {
            setStartDate(
              moment(new Date(res[i]["created_at"])).format("MMMM Do YYYY")
            );
          }
          labels_data.push(
            moment(new Date(res[i]["created_at"])).format("HH:mm:ss")
          );
          const dataset_vals = res[i]["value"].split(" ");
          datasets_temp1.push(parseInt(dataset_vals[0]));
          datasets_temp2.push(parseInt(dataset_vals[1]));
          datasets_moisture.push(parseInt(dataset_vals[2]));
          datasets_light.push(parseInt(dataset_vals[3]));
        }
        datasets_temp1.reverse();
        datasets_temp2.reverse();
        datasets_moisture.reverse();
        datasets_light.reverse();
        labels_data.reverse();
        setLabels(labels_data);
        setDataSets({
          temp1: datasets_temp1,
          temp2: datasets_temp2,
          moisture: datasets_moisture,
          light: datasets_light,
        });
      })
      .catch((err) => console.log(err));

    fetch(URL_ACTIVITY)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("RES", res);
        let actions_data = [];
        res.forEach((r) => {
          actions_data.push({
            created_at: moment(new Date(r["created_at"])).format(
              "Do MMMM YYYY, h:mm:ss a"
            ),
            id: parseInt(r["value"].split("-")[0]),
            text: r["value"].split("-")[1],
          });
        });
        setActions(actions_data);
      })
      .catch((err) => console.log(err));
  }, [URL_LOG, URL_ACTIVITY]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setShow({ readings: true, actions: false })}
          activeOpacity={0.8}
          style={styles.readings}
        >
          {show.readings && <View style={styles.line} />}
          <Text style={{ textAlign: "center", color: "#fff" }}>Readings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actions}
          onPress={() => setShow({ readings: false, actions: true })}
        >
          {show.actions && <View style={styles.line} />}
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            Actions
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body}>
        {show.readings ? (
          <View>
            <Readings
              title="Temperature Inside"
              startDate={startDate}
              labels={labels}
              datasets={dataSets.temp1}
              ysuffix="°C"
            />
            <Readings
              title="Temperature Outside"
              startDate={startDate}
              labels={labels}
              datasets={dataSets.temp2}
              ysuffix="°C"
            />
            <Readings
              title="Moisture"
              startDate={startDate}
              labels={labels}
              datasets={dataSets.moisture}
              ysuffix="%"
            />
            <Readings
              title="Light Outside"
              startDate={startDate}
              labels={labels}
              datasets={dataSets.light}
              ysuffix=" Lux"
            />
          </View>
        ) : (
          <Actions actions={actions} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#5087c6",
  },
  readings: {
    padding: 10,
    flex: 0.5,
  },
  actions: {
    padding: 10,
    flex: 0.5,
  },
  line: {
    position: "absolute",
    width: 197,
    bottom: 0,
    height: 2,
    backgroundColor: "#97d5ea",
  },
  body: {
    flex: 1,
  },
});
