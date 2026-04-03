import { View, StyleSheet } from "react-native";
import { useState } from "react";
import Grid from "../components/Grid";

export default function GameScreen({ route }) {
  const { wordLength } = route.params;

  const [guesses, setGuesses] = useState(
    Array(6)
      .fill(null)
      .map(() => Array(wordLength).fill("")),
  );

  return (
    <View style={styles.container}>
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
});
