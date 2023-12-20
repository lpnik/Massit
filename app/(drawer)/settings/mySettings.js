import { Text, View } from 'react-native';
import { styles } from "c:/OpiskeluEOD/Massit/Styles";
import { StatusBar } from 'expo-status-bar';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';

const MySettings = () => {
  const [salary, setSalary] = useState('');
  const [bonus, setBonus] = useState('');

  return (

    <View style={styles.container}>
      <Drawer.Screen options={{
        title: "Asetukset", 
        headerShown: true, 
        headerLeft: () => <DrawerToggleButton/>}} 
      />

      <Text style={styles.heroText}>Asetukset</Text>

      <View style={styles.info}>
        <View style={styles.infoBox}>
          <Text style={styles.infoInput}>Tuntipalkka</Text>
          <TextInput style={styles.inputText}
            onChangeText={setSalary}
            value={salary}
            placeholder='0,00'
          />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoInput}>HCT-lisä</Text>
          <TextInput style={styles.inputText}
            onChangeText={setBonus}
            value={bonus}
            placeholder='0,00'
          />
        </View>
      </View>

    </View>

    );
}

export default MySettings;