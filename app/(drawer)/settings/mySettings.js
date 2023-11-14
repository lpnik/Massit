import { Text, View } from 'react-native';
import { styles } from "c:/OpiskeluEOD/Massit/Styles";
import { StatusBar } from 'expo-status-bar';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';

const MySettings = () => {

  return (

    <View style={styles.container}>
      <Drawer.Screen options={{
        title: "Asetukset", 
        headerShown: true, 
        headerLeft: () => <DrawerToggleButton/>}} 
      />

      <Text style={styles.heroText}>Asetukset</Text>

      <View style={styles.input}>
        <Text style={styles.info}>Tuntipalkka</Text>
        <TextInput style={styles.inputText}
          placeholder='0,00'
        />
      </View>

      <View style={styles.input}>
        <Text style={styles.info}>HCT-lisä</Text>
        <TextInput style={styles.inputText}
          placeholder='0,00'
        />
      </View>

    </View>

    );
}

export default MySettings;