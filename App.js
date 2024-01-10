import { StatusBar } from 'expo-status-bar';
import { Text,  View } from 'react-native';
import { styles } from "./Styles";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <Text >Massit</Text>
    </View>
  );
}