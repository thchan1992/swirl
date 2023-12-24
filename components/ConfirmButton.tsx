import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { getScreenWidth } from "../util/dimensions";
import {
  elevation,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
} from "../util/shadow";
import { LinearGradient } from "expo-linear-gradient";

interface ConfirmButton {
  title: string;
  onPress: () => void;
  isFinished: boolean;
}

const ConfirmButton: React.FC<ConfirmButton> = ({
  title,
  onPress,
  isFinished,
}) => {
  return (
    <View style={styles.shadow}>
      <TouchableOpacity onPress={onPress} disabled={isFinished}>
        <LinearGradient style={styles.button} colors={["#fb6e76", "#ff2d55"]}>
          <Text style={styles.letter}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: elevation(),
    shadowColor: shadowColor(),
    shadowOffset: shadowOffset(),
    shadowOpacity: shadowOpacity(),
    shadowRadius: shadowRadius(),
  },
  button: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: getScreenWidth() * 0.4,
    height: getScreenWidth() * 0.8 * 0.2,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    margin: 1,
  },
  letter: {
    color: "#000000",
    fontSize: getScreenWidth() * 0.8 * 0.1,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
});

export default ConfirmButton;
