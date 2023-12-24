import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import React from "react";
import { getScreenWidth } from "../util/dimensions";
import {
  elevation,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
} from "../util/shadow";
interface ScoreBoard {
  score: any;
}

const ScoreBoard: React.FC<ScoreBoard> = ({ score }) => {
  const text = typeof score === "string" ? "You won" : "Chance: " + score;

  return (
    <View style={styles.button}>
      <Text style={styles.letter}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: getScreenWidth() * 0.4,
    height: getScreenWidth() * 0.8 * 0.2,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    elevation: elevation(),
    shadowColor: shadowColor(),
    shadowOffset: shadowOffset(),
    shadowOpacity: shadowOpacity(),
    shadowRadius: shadowRadius(),
    margin: 1,
  },
  letter: {
    color: "#000000",
    fontSize: getScreenWidth() * 0.8 * 0.07,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
});

export default ScoreBoard;
