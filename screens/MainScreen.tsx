import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getScreenHeight, getScreenWidth } from "../util/dimensions";
import ScoreBoard from "../components/ScoreBoard";
import GuessButton from "../components/GuessButton";
import {
  elevation,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
} from "../util/shadow";
import ConfirmButton from "../components/ConfirmButton";
import AnswerInput from "../components/AnswerInput";
import { getAnswerId } from "../constants/getAnswerId";
import { AnswerData } from "../util/types";
import answerData from "../assets/items_list.json";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dateConvertor } from "../util/dateConvertor";
import { imageSourceFinder } from "../util/imageMap";

const MainScreen: React.FC = () => {
  const [answer, setAnswer] = useState("");
  const [answerList, setAnswerList] = useState([]);
  const [letterList, setLetterList] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(true);
  const [level, setLevel] = useState(0);
  const typedAnswerData: AnswerData = answerData;
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    //answer change,
    //put the answer into the list,
    //put all the letter into the newVal
    let newVal: string[] = [...answer];
    //calculator the new newVal length
    // if the newVal is shorter than 5, we need to pad that to 5
    if (newVal.length < 5) {
      let x = 0;
      for (let i = 0; i < 5; i++) {
        if (newVal[i] === undefined) {
          x++;
        }
      }
      for (let i = 0; i < x; i++) {
        newVal.push("");
      }
    }
    setLetterList(newVal);
  }, [answer]);

  useEffect(() => {
    if (isCorrect) {
      setLetterList(["R", "I", "G", "H", "T"]);
    } else if (isCorrect === false) {
      setLetterList(["W", "R", "O", "N", "G"]);
    }
    setIsLoading(false);
  }, [isLoading]);

  const handleTextChange = (text: string) => {
    if (Platform.OS === "ios") {
      if (/^[a-zA-Z]*$/.test(text)) {
        setAnswer(text.toUpperCase());
      }
    } else {
      setTimeout(() => {
        if (/^[a-zA-Z]*$/.test(text)) {
          setAnswer(text.toUpperCase());
        }
      }, 100);
    }
  };

  useEffect(() => {
    //save the anseerList, and current date into the local storage
    const updateStorage = async () => {
      try {
        console.log(answerList);
        const jsonValue = JSON.stringify(answerList);
        await AsyncStorage.setItem("answerList", jsonValue);
        console.log(jsonValue, "saved answerList");
      } catch (e) {
        console.error("Error storing answerList", e);
      }
    };

    const updateDate = async () => {
      try {
        const currentDate = new Date();
        const dateToStore = dateConvertor(currentDate);
        await AsyncStorage.setItem("date", dateToStore);
      } catch (e) {
        console.error("Error storing date", e);
      }
    };
    if (answerList.length > 0) {
      // Perform any actions you need with the updated list here.
      updateStorage();
      updateDate();
    }
  }, [answerList]);

  useEffect(() => {
    const getAnswerList = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("answerList");
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (e) {
        console.error("Error retrieving answerList", e);
        return [];
      }
    };

    //once the app is on, the app will check the local storage whether the current date is matching the date in the system,
    const getDate = async () => {
      try {
        const currentDate = new Date();
        const dateToCheck = dateConvertor(currentDate);
        const date = await AsyncStorage.getItem("date");
        console.log(date === dateToCheck);
        if (dateToCheck === date) {
          console.log("xx");
          const arr = await getAnswerList();
          console.log(arr);
          setAnswerList(arr);
          setLevel(arr.length * 2);
        } else {
        }
      } catch (e) {
        console.log("Error getting date ", e);
      }
    };
    getDate();

    //if not, delete everything,
    //if yes, load the answer list, and calculate the answer length to get the level
  }, []);

  const submitAnswer = () => {
    if (answerList.indexOf(answer) === -1) {
      if (typedAnswerData[getAnswerId].name.toUpperCase() === answer) {
        setIsCorrect(true);
        setLevel(60);
      } else {
        setIsCorrect(false);
        setAnswerList((prevAnswers) => [...prevAnswers, answer]);

        console.log(
          answerList,
          typedAnswerData[getAnswerId].name.toUpperCase()
        );
        setAnswer("");
        setLevel(level + 2);
      }
    } else {
      setAnswer("");
      showAlert("Duplicated", "The same answer has been entered");
    }
  };

  const showAlert = (error: string, message: string) => {
    Alert.alert(
      error, // Title of the alert
      message, // Message of the alert
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 2 }}>
            <View style={styles.imageContainer}>
              <Image
                blurRadius={60 - level}
                style={styles.image}
                source={imageSourceFinder(typedAnswerData[getAnswerId].name)}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              {letterList.map((letter, i) => {
                if (letter == null && i < 5) {
                  return (
                    <GuessButton
                      key={i}
                      letter={""}
                      onPress={() => {}}
                      isCorrect={isCorrect}
                    />
                  );
                } else {
                  return (
                    <GuessButton
                      key={i}
                      letter={letter}
                      onPress={() => {}}
                      isCorrect={isCorrect}
                    />
                  );
                }
              })}
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <AnswerInput
                onSubmitEditing={() => {
                  if (answer.length === 5) {
                    setIsLoading(true);
                    submitAnswer();
                    Keyboard.dismiss();
                  } else {
                    showAlert("Anwser", "Answer must be 5 characters");
                  }
                }}
                value={answer}
                onChangeText={handleTextChange}
                placeholder="hello"
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <ConfirmButton
                title="Guess"
                onPress={() => {
                  if (answer.length === 5) {
                    setIsLoading(true);
                    submitAnswer();
                    Keyboard.dismiss();
                  } else {
                    showAlert("Anwser", "Answer must be 5 characters");
                  }
                }}
              />
              <ScoreBoard score={answerList.length} />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  imageContainer: {
    // borderWidth: 1,
    elevation: elevation(),
    shadowOffset: shadowOffset(),
    shadowColor: shadowColor(),
    shadowOpacity: shadowOpacity(),
    shadowRadius: shadowRadius(),
    backgroundColor: "white",
    borderRadius: 20,
  },
  image: {
    width: getScreenWidth() * 0.83,
    height: getScreenHeight() * 0.65,
    borderRadius: 20,
  },
});

export default MainScreen;
