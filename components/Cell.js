import { View, Text, StyleSheet } from "react-native";

export default function Cell({ letter, color }) {
  const backgroundColor =
    color === "green"
      ? "#6aaa64"
      : color === "yellow"
        ? "#c9b458"
        : color === "grey"
          ? "#787c7e"
          : "#fff";

  const textColor = color ? "#fff" : "#000";

  const borderColor = color ? backgroundColor : "#d3d6da";

  return (
    <View
      style={[
        styles.cell,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    borderWidth: 2,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
