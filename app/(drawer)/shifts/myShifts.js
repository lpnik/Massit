import { Text, View } from 'react-native';
import { styles } from "c:/OpiskeluEOD/Massit/Styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

export default function MyShifts() {
  const db = SQLite.openDatabase('shifts.db');
  const [isLoading, setIsLoading] = useState(true);
  const [shifts, setShifts] = useState([]);
  const [currentShift, setCurrentName] = useState(undefined);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS shifts (id INTEGER PRIMARY KEY AUTOINCREMENT, shift TEXT)')
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM shifts', null,
      (txObj, resultSet) => setShifts(resultSet.rows._array),
      (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Tehdyt työvuorot latautuvat...</Text>
      </View>
    );
  }

  const showShifts = () => {
    return shifts.map((shift, index) => {
      return (
        <View style={styles.row}>
          <Text>{shift.shift}</Text>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <Drawer.Screen options={{
        title: "Työvuorot", 
        headerShown: true, 
        headerLeft: () => <DrawerToggleButton/>}} 
      />

      <Text style={styles.heroTextShift}>Tehdyt työvuorot</Text>

      <Text value={currentShift} />
      {showShifts()}
    </View>
  );
}