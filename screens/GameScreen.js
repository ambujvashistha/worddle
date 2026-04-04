import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import Grid from "../components/Grid";

export default function GameScreen({ route }) {
  const { wordLength } = route.params;

  const [guesses, setGuesses] = useState(
    Array(5)
      .fill(null)
      .map(() => Array(wordLength).fill("")),
  );

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
  heading:{
    fontSize:"50",
    fontWeight:"700",
  }
});
