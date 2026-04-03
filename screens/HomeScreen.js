import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  const startGame = (length) => {
    navigation.navigate("Game", { wordLength: length });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Word Length</Text>

      {[4, 5, 6].map((len) => (
        <TouchableOpacity
          key={len}
          style={styles.button}
          onPress={() => startGame(len)}
        >
          <Text>{len} Letters</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    margin: 8,
    backgroundColor: "#ddd",
    width: 150,
    alignItems: "center",
  },
});
