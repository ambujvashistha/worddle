import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Cell({ letter, onPress }) {
  return (
    <TouchableOpacity style={styles.cell} onPress={onPress}>
      <Text style={styles.text}>{letter}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
