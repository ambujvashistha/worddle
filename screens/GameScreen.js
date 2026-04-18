import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Grid from "../components/Grid";
import Keyboard from "../components/Keyboard";
import VictoryModal from "../components/VictoryModal";
import GameOverModal from "../components/GameOverModal";
import { WORDS_4, WORDS_5, WORDS_6 } from "../utils/Words";

const MAX_ATTEMPTS = 5;

const createEmptyGuesses = (wordLength) =>
  Array(MAX_ATTEMPTS)
    .fill(null)
    .map(() =>
      Array(wordLength)
        .fill(null)
        .map(() => ({ letter: "", color: "" })),
    );

const getRandomWord = (wordLength) => {
  let list = WORDS_5;

  if (wordLength === 4) list = WORDS_4;
  if (wordLength === 5) list = WORDS_5;
  if (wordLength === 6) list = WORDS_6;

  return list[Math.floor(Math.random() * list.length)];
};

export default function GameScreen({ route, navigation }) {
  const { wordLength } = route.params;
  const [guesses, setGuesses] = useState(createEmptyGuesses(wordLength));

  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [targetWord, setTargetWord] = useState(() => getRandomWord(wordLength));

  const resetGame = () => {
    setGuesses(createEmptyGuesses(wordLength));
    setCurrentRow(0);
    setCurrentCol(0);
    setGameOver(false);
    setHasWon(false);
    setTargetWord(getRandomWord(wordLength));
  };

  const handleKeyPress = (key) => {
    if (gameOver || hasWon || currentRow >= MAX_ATTEMPTS) return;
    if (currentCol >= wordLength) return;

    const newGuesses = [...guesses];
    newGuesses[currentRow][currentCol] = {
      letter: key,
      color: "",
    };

    setGuesses(newGuesses);
    setCurrentCol((prev) => prev + 1);
  };

  const handleDelete = () => {
    if (gameOver || hasWon || currentRow >= MAX_ATTEMPTS) return;
    if (currentCol === 0) return;

    const newGuesses = [...guesses];
    newGuesses[currentRow][currentCol - 1] = {
      letter: "",
      color: "",
    };

    setGuesses(newGuesses);
    setCurrentCol((prev) => prev - 1);
  };

  const handleEnter = () => {
    console.log(targetWord);
    if (gameOver || hasWon || currentRow >= MAX_ATTEMPTS) return;
    if (currentCol < wordLength) return;

    const guess = guesses[currentRow].map((c) => c.letter);
    const target = targetWord.split("");

    const newGuesses = [...guesses];
    const colors = Array(wordLength).fill("grey");
    const tempTarget = [...target];

    for (let i = 0; i < wordLength; i++) {
      if (guess[i] === tempTarget[i]) {
        colors[i] = "green";
        tempTarget[i] = null;
      }
    }

    for (let i = 0; i < wordLength; i++) {
      if (colors[i] === "green") continue;

      const idx = tempTarget.indexOf(guess[i]);
      if (idx !== -1) {
        colors[i] = "yellow";
        tempTarget[idx] = null;
      }
    }

    for (let i = 0; i < wordLength; i++) {
      newGuesses[currentRow][i].color = colors[i];
    }

    setGuesses(newGuesses);

    if (guess.join("") === targetWord) {
      setHasWon(true);
      return;
    }

    const nextRow = currentRow + 1;
    if (nextRow >= MAX_ATTEMPTS) {
      setGameOver(true);
      return;
    }

    setCurrentRow(nextRow);
    setCurrentCol(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Worddle</Text>

      {/* {gameOver ? (
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Game Over</Text>
          <Text style={styles.statusSubtitle}>The word was {targetWord}</Text>
        </View>
      ) : null} */}

      <View style={styles.gridContainer}>
        <Grid
          guesses={guesses}
          currentRow={currentRow}
          currentCol={currentCol}
        />
      </View>

      <View style={styles.keyboardWrapper}>
        <Keyboard
          onKeyPress={handleKeyPress}
          onDelete={handleDelete}
          onEnter={handleEnter}
        />
      </View>

      <GameOverModal
        visible={gameOver}
        word={targetWord}
        onPlayAgain={resetGame}
        onGoHome={() => navigation.goBack()}
      />

      <VictoryModal
        visible={hasWon}
        word={targetWord}
        onPlayAgain={resetGame}
        onGoHome={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
  },
  gridContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardWrapper: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  statusCard: {
    alignSelf: "center",
    marginTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  statusSubtitle: {
    marginTop: 2,
    fontSize: 14,
    color: "#666",
  },
});
