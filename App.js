import { View, Text, StyleSheet } from "react-native";

export default function App() {
  const guesses = Array(6).fill(Array(5).fill(""));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle Lite</Text>

      {guesses.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((_, j) => (
            <View key={j} style={styles.tile} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  tile: {
    width: 50,
    height: 50,
    borderWidth: 1,
    margin: 4,
  },
});
