import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { getScreenWidth } from "../util/dimensions";
import {
  elevation,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
} from "../util/shadow";
interface GuessButton {
  letter: string;
  onPress: () => void;
  isCorrect: boolean;
}

const GuessButton: React.FC<GuessButton> = ({ letter, onPress, isCorrect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isCorrect === null
          ? undefined
          : isCorrect
            ? { backgroundColor: "#4cd964" }
            : { backgroundColor: "#ff5959" },
      ]}
      onPress={onPress}
    >
      <Text style={styles.letter}>{letter}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: getScreenWidth() * 0.8 * 0.2,
    height: getScreenWidth() * 0.8 * 0.2,
    borderRadius: 10,
    elevation: elevation(),
    shadowColor: shadowColor(),
    shadowOffset: shadowOffset(),
    shadowOpacity: shadowOpacity(),
    shadowRadius: shadowRadius(),
    margin: 1,
  },
  letter: {
    color: "#000000",
    fontSize: getScreenWidth() * 0.8 * 0.1,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
});

export default GuessButton;
