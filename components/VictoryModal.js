import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VictoryModal({
  visible,
  word,
  onPlayAgain,
  onGoHome,
}) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onPlayAgain}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>You Guessed It</Text>
          <Text style={styles.subtitle}>The word was solved successfully.</Text>

          <View style={styles.wordBadge}>
            <Text style={styles.wordText}>{word}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                requestAnimationFrame(onPlayAgain);
              }}
            >
              <Text style={styles.primaryButtonText}>Play Again</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={onGoHome}>
              <Text style={styles.secondaryButtonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.22)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
  wordBadge: {
    marginTop: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  wordText: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#111",
  },
  actions: {
    width: "100%",
    marginTop: 24,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#111",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  secondaryButtonText: {
    color: "#111",
    fontSize: 15,
    fontWeight: "600",
  },
});
