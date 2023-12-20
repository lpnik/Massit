import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from "c:/OpiskeluEOD/Massit/Styles";
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
      tx.executeSql('CREATE TABLE IF NOT EXISTS shifts (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, time TEXT, rest TEXT)')
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
      const formattedTime = formatTime(parseInt(shift.time));
      const formattedTimeRest = formatTime(parseInt(shift.rest));

      return (
        <View style={styles.row} key={index}>
            <Text>
              Päivämäärä: {shift.date} {'\n'}
              Aika: {formattedTime} {'\n'}
              Tauko: {formattedTimeRest} {'\n'}
              -----------------------------------------
            </Text> 
            <TouchableOpacity onPress={() => delData(shift.id)}>
              <Text> Delete</Text>
            </TouchableOpacity>

        </View>
      );
    });
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
  
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const delData = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM shifts WHERE id = ?', [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let existingShifts = [...shifts].filter(shift => shift.id !== id);
          setShifts(existingShifts);
        }
      },
      (txObj, error) => console.log(error)
      );
    });
  };

  const dropTable = () => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS shifts');
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Tehdyt työvuorot latautuvat...</Text>
      </View>
    );
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

      <TouchableOpacity onPress={dropTable}>
        <Text>Drop Table</Text>
      </TouchableOpacity>

      <Text>
        Palkka:
      </Text>
    </View>
  );
}

/*
          <Pressable
            onPress={() => {
              delData(shift.id)
            }}>
            <Text>Delete</Text>
          </Pressable>
*/