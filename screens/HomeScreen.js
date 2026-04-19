import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import CustomWordModal from "../components/CustomWordModal";

export default function HomeScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);

  const startGame = (length) => {
    navigation.navigate("Game", { wordLength: length });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT GAME TYPE</Text>

      {[4, 5, 6].map((len) => (
        <TouchableOpacity
          key={len}
          style={styles.button}
          onPress={() => startGame(len)}
        >
          <Text>{len} LETTERS</Text>
        </TouchableOpacity>
      ))}


      <TouchableOpacity
        style={styles.customButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={{color:"white"}}>CUSTOM WORD</Text>
      </TouchableOpacity>

   
      <CustomWordModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        navigation={navigation}
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
    borderRadius: 10,
  },
  customButton: {
    padding: 12,
    margin: 8,
    backgroundColor: "#000000",
    color: "#ddd",
    width: 150,
    alignItems: "center",
    borderRadius: 10,
  },
});
