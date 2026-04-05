import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Grid from "../components/Grid";
import Keyboard from "../components/Keyboard";
import { WORDS_4, WORDS_5, WORDS_6 } from "../utils/Words";

export default function GameScreen({ route }) {
  const { wordLength } = route.params;
  const [guesses, setGuesses] = useState(
    Array(5)
      .fill(null)
      .map(() => Array(wordLength).fill("")),
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  
  const getRandomWord = () => {
    let list;

    if (wordLength === 4) list = WORDS_4;
    if (wordLength === 5) list = WORDS_5;
    if (wordLength === 6) list = WORDS_6;

    return list[Math.floor(Math.random() * list.length)];
  };

  const [targetWord, setTargetWord] = useState(getRandomWord());

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

    const currentGuess = guesses[currentRow].join("");

    console.log("Guess:", currentGuess);
    console.log("Target:", targetWord);
    if (currentGuess === targetWord) {
      console.log("WIN 🎉");
    }

    setCurrentRow((prev) => prev + 1);
    setCurrentCol(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Wordle</Text>

      <View style={styles.gridContainer}>
        <Grid guesses={guesses} />
      </View>

      <Keyboard
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
        onEnter={handleEnter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  gridContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
