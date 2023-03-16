import React, { Component, useState } from "react";
import { StyleSheet, PanResponder, Dimensions } from "react-native";

import * as theme from "../theme";
import Block from "./Block";
import Text from "./Text";

const { height } = Dimensions.get("window");
const CONTROLLER_HEIGHT = height * 0.25;

const PanSlider = (props) => {
  const [state, setState] = useState({
    panValue: 0,
    rangeValue: 0,
    percentage: 0,
  });

  const handleMove = (moveValue) => {
    const { panValue } = state;
    const { minValue, maxValue } = props;
    const max = maxValue > CONTROLLER_HEIGHT ? maxValue : CONTROLLER_HEIGHT;
    const range = (maxValue || max) - minValue;

    let value = panValue - moveValue / range;
    if (value > max) {
      value = max;
    }
    if (value < minValue) {
      value = minValue;
    }

    const percentage = (value / max) * 100;
    const rangeValue = (range * percentage) / 100;

    setState({ panValue: value, rangeValue, percentage });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (evt, { dy }) => handleMove(dy),
  });

  const { minValue } = props;
  const { rangeValue, percentage } = state;

  return (
    <Block right {...panResponder.panHandlers} style={styles.controller}>
      <Block center style={styles.controllerValue}>
        <Text weight="600" color="black">
          {rangeValue ? rangeValue.toFixed(0) : minValue}
        </Text>
      </Block>
      <Block
        style={[
          styles.controllerOverlay,
          { height: `${percentage || minValue}%` },
        ]}
      />
    </Block>
  );
};

PanSlider.defaultProps = {
  minValue: 10,
  maxValue: 45,
};

export default PanSlider;

const styles = StyleSheet.create({
  controller: {
    width: 85,
    height: CONTROLLER_HEIGHT,
    borderRadius: 10,
    backgroundColor: theme.colors.gray2,
    alignContent: "center",
    overflow: "hidden",
  },
  controllerValue: {
    position: "absolute",
    top: 24,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  controllerOverlay: {
    width: 85,
    backgroundColor: theme.colors.accent,
  },
});
