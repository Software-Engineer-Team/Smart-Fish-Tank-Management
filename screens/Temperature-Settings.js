import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CheckBoxField, Divider, Title } from "../components";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as theme from "../theme";

export default function TemperatureSettings() {
  const [auto, setAuto] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [manual, setManual] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({ onPress }) => (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
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
  const removeAllState = () => {
    setAuto(false);
    setScheduled(false);
    setManual(false);
  };
  return (
    <View style={styles.container}>
      <Title type={"Sunscreen Adjustment mode"} />
      <CheckBoxField
        title="Automatic"
        role={auto}
        removeAllState={removeAllState}
        onChangeValueHandler={setAuto}
      />
      <CheckBoxField
        title="Scheduled"
        role={scheduled}
        removeAllState={removeAllState}
        onChangeValueHandler={setScheduled}
      />
      <CheckBoxField
        title="Manual (on-demand)"
        role={manual}
        removeAllState={removeAllState}
        onChangeValueHandler={setManual}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
});
