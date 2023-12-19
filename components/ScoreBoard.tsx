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
  score: number;
}

const ScoreBoard: React.FC<ScoreBoard> = ({ score }) => {
  return (
    <View style={styles.button}>
      <Text style={styles.letter}>{score}</Text>
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
    fontSize: getScreenWidth() * 0.8 * 0.1,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
});

export default ScoreBoard;
