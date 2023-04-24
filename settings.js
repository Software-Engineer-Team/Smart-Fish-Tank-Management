import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as theme from "./theme";

export default {
  light: {
    name: "Light",
    icon: ({ size, color, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        name="lightbulb-on-outline"
        {...props}
      />
    ),
  },
  ac: {
    name: "AC",
    icon: ({ size, color, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        name="air-conditioner"
        {...props}
      />
    ),
  },
  temperatureCelsius: {
    name: "Temperature",
    icon: ({ size, color, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        name="temperature-celsius"
        {...props}
      />
    ),
  },
  temperature: {
    name: "Temperature",
    icon: ({ size, color, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        name="coolant-temperature"
        {...props}
      />
    ),
  },
  fan: {
    name: "Fan",
    icon: ({ size, color, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        name="fan"
        {...props}
      />
    ),
  },
  "wi-fi": {
    name: "Wi-Fi",
    icon: ({ size, color, ...props }) => (
      <FontAwesome
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        name="wifi"
        {...props}
      />
    ),
  },
  electricity: {
    name: "Electricity",
    icon: ({ size, color, ...props }) => (
      <MaterialIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        name="power"
        {...props}
      />
    ),
  },
  reminder: {
    name: "Reminder",
    icon: ({ size, color, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        name="reminder"
        {...props}
      />
    ),
  },
};
