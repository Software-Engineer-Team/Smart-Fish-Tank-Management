import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as theme from "./theme";

export default {
  light: {
    name: "Light",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="lightbulb-on-outline"
        {...props}
      />
    ),
  },
  ac: {
    name: "AC",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="air-conditioner"
        {...props}
      />
    ),
  },
  power: {
    name: "Power",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="power"
        {...props}
      />
    ),
  },
  fire: {
    name: "Fire",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="fire"
        {...props}
      />
    ),
  },
  statistics: {
    name: "Statistics",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="chart-areaspline"
        {...props}
      />
    ),
  },
  temperatureCelsius: {
    name: "Temperature",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="temperature-celsius"
        {...props}
      />
    ),
  },
  temperature: {
    name: "Temperature",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="coolant-temperature"
        {...props}
      />
    ),
  },
  percent: {
    name: "Percent",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="percent"
        {...props}
      />
    ),
  },
  moisture: {
    name: "Moisture",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="water-percent"
        {...props}
      />
    ),
  },
  profile: {
    name: "Profile",
    icon: ({ size, color, style, ...props }) => (
      <MaterialIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="person"
        {...props}
      />
    ),
  },
  feeding: {
    name: "Feeding",
    icon: ({ size, color, style, ...props }) => (
      <MaterialIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="schedule"
        {...props}
      />
    ),
  },
  electricity: {
    name: "Electricity",
    icon: ({ size, color, style, ...props }) => (
      <MaterialIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="power"
        {...props}
      />
    ),
  },
  reminder: {
    name: "Reminder",
    icon: ({ size, color, style, ...props }) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.base}
        style={style}
        name="reminder"
        {...props}
      />
    ),
  },
};
