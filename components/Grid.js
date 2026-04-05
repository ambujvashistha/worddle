import { View, StyleSheet } from "react-native";
import Cell from "./Cell";

export default function Grid({ guesses }) {
  return (
    <View>
      {guesses.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((cell, j) => (
            <Cell key={j} letter={cell.letter} color={cell.color} onPress={() => { console.log("pressed",i,j)}} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
