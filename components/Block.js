import React from "react";
import { StyleSheet, View } from "react-native";

const Block = (blockProps) => {
  const {
    flex,
    row,
    column,
    center,
    middle,
    right,
    space,
    style,
    children,
    ...props
  } = blockProps;
  const blockStyles = [
    styles.block,
    flex && { flex },
    flex === "disabled" && { flex: 0 },
    center && styles.center,
    middle && styles.middle,
    right && styles.right,
    space && { justifyContent: `space-${space}` },
    row && styles.row,
    column && styles.column,
    style,
  ];

  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

export default Block;

const styles = StyleSheet.create({
  block: {
    // flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  center: {
    alignItems: "center",
  },
  middle: {
    justifyContent: "center",
  },
  right: {
    justifyContent: "flex-end",
  },
});
