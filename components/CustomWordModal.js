import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";

export default function CustomWordModal({ visible, onClose, navigation }) {
  const [word, setWord] = useState("");

  const upperWord = word.toUpperCase();

  const handlePlay = () => {
    if (!upperWord) return;
    onClose();
    setTimeout(() => {
      navigation.navigate("Game", { word: upperWord });
    }, 0);
  };

  const handleLink = async () => {
    if (!upperWord) return;
    const link = `mywordle://play?word=${upperWord}`;
    await Clipboard.setStringAsync(link);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>ENTER WORD</Text>

          <TextInput
            value={word}
            onChangeText={setWord}
            autoCapitalize="characters"
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handlePlay}>
            <Text>PLAY</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLink}>
            <Text>GENERATE LINK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    width: 250,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    padding: 10,
    marginTop: 5,
    backgroundColor: "#ddd",
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
  },
  close: {
    marginTop: 10,
  },
});
