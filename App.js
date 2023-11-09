import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { styles } from "./Styles";

export default function App() {
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

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Kirjaudu sisään
        </Text>
      </Pressable>

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