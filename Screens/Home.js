import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { styles } from "./Styles";

const Home = () => {


    return (
        <View style={styles.container}>
        <StatusBar style="auto" />
  
        <View style={styles.hero}>
          <Text style={styles.heroText}>Massit</Text>
        </View>

        </View>

        );
}

export default Home;