import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../Styles";
import { StatusBar } from 'expo-status-bar';
import { Link } from "expo-router";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

export default function Page() {
  const [fontsLoaded] = useFonts({
    "MarheyRegular": require("../assets/fonts/Marhey-Regular.ttf")
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.hero}>
        <Text style={styles.heroText}>Massit</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.boxText}>Työajanseuranta</Text>
      </View>


      <Link href={"/(drawer)/home"} asChild>
        <Pressable style={styles.button} >
          <Text style={styles.buttonText}>
            Sisään
          </Text>
        </Pressable>
      </Link>

    </View>
  );
}


