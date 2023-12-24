import { View, TextInput, StyleSheet } from "react-native";
import {
  elevation,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
} from "../util/shadow";
import { getScreenWidth } from "../util/dimensions";
interface AnswerInput {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmitEditing: () => void;
  isFinished: boolean;
}

const AnswerInput: React.FC<AnswerInput> = ({
  value,
  onChangeText,
  placeholder,
  onSubmitEditing,
  isFinished,
}) => {
  return (
    <View
      style={{
        // borderBottomWidth: 3,
        width: getScreenWidth() * 0.83,
        marginVertical: 10,
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        borderRadius: 30,
        shadowColor: shadowColor(),
        shadowOffset: shadowOffset(),
        shadowOpacity: shadowOpacity(),
        shadowRadius: shadowRadius(),
        elevation: elevation(),
      }}
    >
      <TextInput
        style={{
          textAlign: "center",
          // fontSize: 50,
          color: "black",
          // color: "#000000",
          fontSize: getScreenWidth() * 0.8 * 0.1,
          fontWeight: "bold",
          fontFamily: "Montserrat-Bold",
        }}
        editable={isFinished ? false : true}
        autoCorrect={false}
        maxLength={5}
        onChangeText={onChangeText}
        value={value}
        placeholder={"Answer here"}
        placeholderTextColor="white"
        keyboardType="default"
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default AnswerInput;

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
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
