import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import MainScreen from "./screens/MainScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
export default function App() {
  let [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.otf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#34aadc", "#002366"]} style={styles.container}>
      {/* <StatusBar hidden={true} /> */}
      <SafeAreaView>
        <MainScreen />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#34aadc',
    alignItems: "center",
    justifyContent: "center",
  },
});
