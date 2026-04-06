import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Grid from "../components/Grid";
import Keyboard from "../components/Keyboard";
import { WORDS_4, WORDS_5, WORDS_6 } from "../utils/Words";

export default function GameScreen({ route }) {
  const { wordLength } = route.params;
  const [freq, setFreq] =useState()
  const [guesses, setGuesses] = useState(
    Array(5)
      .fill(null)
      .map(() =>
        Array(wordLength)
          .fill(null)
          .map(() => ({ letter: "", color: "" })),
      ),
  );

  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver, setGameOver] = useState(false)

  const getRandomWord = () => {
    let list;
    if (wordLength === 4) list = WORDS_4;
    if (wordLength === 5) list = WORDS_5;
    if (wordLength === 6) list = WORDS_6;

    return list[Math.floor(Math.random() * list.length)];
  };

  const [targetWord] = useState(getRandomWord());

  const handleKeyPress = (key) => {
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
    console.log(currentRow, wordLength)
    if (currentRow === 4){
      setGameOver((prev)=>(true))
    }
    if (currentCol < wordLength) return;

    const guess = guesses[currentRow].map((c) => c.letter);
    const target = targetWord.split("");

    const newGuesses = [...guesses];

    for (let i = 0; i < wordLength; i++) {
      if (guess[i] === target[i]) {
        newGuesses[currentRow][i].color = "green";
      } else if (target.includes(guess[i])) {
        newGuesses[currentRow][i].color = "yellow";
      } else {
        newGuesses[currentRow][i].color = "grey";
      }
    }

    setGuesses(newGuesses);

    if (guess.join("") === targetWord) {
      console.log("WIN 🎉");
    }

    setCurrentRow((prev) => prev + 1);
    setCurrentCol(0);
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Wordle</Text>
      {/* {gameOver ? (
        <View>
          <Text>Game Over</Text>
          <Text>{targetWord}</Text>
        </View>
      ) : (
        <></>
      )} */}

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
});
