import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../Styles";
import { StatusBar } from 'expo-status-bar';
import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.hero}>
        <Text style={styles.heroText}>Massit</Text>
      </View>

      <View style={styles.input}>
        <TextInput style={styles.inputText}
          placeholder='Sähköposti'
        />
      </View>

      <View style={styles.input}>
        <TextInput style={styles.inputText}
          placeholder='Salasana'
        />
      </View>

      <Link href={"/(drawer)/home"} asChild>
        <Pressable style={styles.button} >
          <Text style={styles.buttonText}>
            Kirjaudu sisään
          </Text>
        </Pressable>
      </Link>

      <View style={styles.box}>
        <Text style={styles.boxText}>
          Etkö vielä ole luonut käyttäjätunnusta?
        </Text>
        <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Luo tunnus
        </Text>
      </Pressable>

      </View>

    </View>
  );
}


