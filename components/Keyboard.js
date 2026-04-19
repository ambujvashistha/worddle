import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const KEY_MARGIN = 3;
const KEY_WIDTH = (width - 20 - KEY_MARGIN * 20) / 10;

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export default function Keyboard({ onKeyPress, onDelete, onEnter, keyColors }) {
  const handlePress = (key) => {
    if (key === "ENTER") {
      onEnter();
    } else if (key === "⌫") {
      onDelete();
    } else {
      onKeyPress(key);
    }
  };

  const getKeyStyle = (key) => {
    if (key === "ENTER" || key === "⌫") return styles.specialKey;

    const color = keyColors?.[key];

    if (color === "green") return { backgroundColor: "#6aaa64" };
    if (color === "yellow") return { backgroundColor: "#c9b458" };
    if (color === "grey") return { backgroundColor: "#787c7e" };

    return {};
  };

  const getTextStyle = (key) => {
    if (key === "ENTER" || key === "⌫") return styles.specialKeyText;

    const color = keyColors?.[key];
    if (color) return { color: "#fff" };

    return {};
  };

  return (
    <View style={styles.keyboard}>
      {ROWS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => {
            const isSpecialKey = key === "ENTER" || key === "⌫";
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.key,
                  isSpecialKey && styles.specialKey,
                  getKeyStyle(key),
                  key === "ENTER" && { width: KEY_WIDTH * 1.5 },
                  key === "⌫" && { width: KEY_WIDTH * 1.5 },
                ]}
                onPress={() => handlePress(key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.keyText,
                    isSpecialKey && styles.specialKeyText,
                    getTextStyle(key),
                  ]}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "center",
  },
  key: {
    width: KEY_WIDTH,
    height: 55,
    backgroundColor: "#d3d6da",
    borderRadius: 4,
    marginHorizontal: KEY_MARGIN,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  specialKey: {
    backgroundColor: "#818384",
  },
  keyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  specialKeyText: {
    color: "#fff",
    fontSize: 12,
  },
});
