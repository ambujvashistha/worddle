import { View, StyleSheet, Text } from "react-native";
import Grid from "./components/Grid";

export default function App() {
  const guesses = Array(6)
    .fill(null)
    .map(() => Array(5).fill(""));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wordle</Text>
      <Grid guesses={guesses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "balck",
    fontSize: "40"
  }
});
