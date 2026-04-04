import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import Grid from "../components/Grid";
import Keyboard from "../components/Keyboard";

export default function GameScreen({ route }) {
  const { wordLength } = route.params;
  const [guesses, setGuesses] = useState(
    Array(5)
      .fill(null)
      .map(() => Array(wordLength).fill("")),
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  const handleKeyPress = (key) => {
    if (currentCol >= wordLength) return;

    const newGuesses = [...guesses];
    newGuesses[currentRow][currentCol] = key;

    setGuesses(newGuesses);
    setCurrentCol((prev) => prev + 1);
  };

  const handleDelete = () => {
    if (currentCol === 0) return;

    const newGuesses = [...guesses];
    newGuesses[currentRow][currentCol - 1] = "";

    setGuesses(newGuesses);
    setCurrentCol((prev) => prev - 1);
  };

  const handleEnter = () => {
    if (currentCol < wordLength) return;

    setCurrentRow((prev) => prev + 1);
    setCurrentCol(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wordle</Text>
      <Grid guesses={guesses} currentRow={currentRow} currentCol={currentCol} />
      <Keyboard
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
        onEnter={handleEnter}
      />
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
