import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { styles } from '../../../Styles';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MyShifts() {
  const db = SQLite.openDatabase('shifts.db');
  const [isLoading, setIsLoading] = useState(true);
  const [shifts, setShifts] = useState([]);
  const [currentShift, setCurrentShift] = useState(undefined);

  const loadData = () => {
    setIsLoading(true);
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM shifts', null,
          (txObj, resultSet) => {
            const shiftsFromDatabase = resultSet.rows._array.map(shift => ({
              ...shift,
              rest: JSON.parse(shift.rest),
            }));
            console.log('Shifts from database(ld):', shiftsFromDatabase);
            setShifts(shiftsFromDatabase);
          },
          (txObj, error) => {
            console.log('Error loading data:', error);
            setIsLoading(false);
          }
        );
      },
      null,
      () => setIsLoading(false)
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS shifts (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, time TEXT, rest TEXT)');
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM shifts', null,
        (txObj, resultSet) => {
          const shiftsFromDatabase = resultSet.rows._array.map(shift => ({
            ...shift,
            rest: JSON.parse(shift.rest),
          }));
          console.log('Shifts from database:', shiftsFromDatabase);
          setShifts(shiftsFromDatabase);
        },
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
      const dateStart = shift.date.split(' ')[0];
      const timeStart = shift.date.split(' ')[1];
      const formattedTime = formatTime(shift.time);
      const formattedTimeRest = Array.isArray(shift.rest)
        ? shift.rest.map((rest) => formatTime(rest)).join(', ')
        : formatTime(shift.rest);

  
      return (
        <View style={styles.showShifts} key={index}>
          <LinearGradient
            colors={['#135771', '#052e3d']}
            style={styles.linearGradient}
          >
            <View style={styles.shiftsContainer}>
                <Text style={styles.shifts}>
                    {dateStart} klo <Text style={styles.shiftsText}>{timeStart}</Text> {'\n'}
                    Tunnit: <Text style={styles.shiftsText}>{formattedTime}</Text> {'\n'}
                    Tauot: <Text style={styles.shiftsText}>{formattedTimeRest}</Text>
                </Text>
                <TouchableOpacity onPress={() => delData(shift.id)}>
                  <Text style={styles.shiftsRemove}>Poista</Text>
                </TouchableOpacity>

            </View>
          </LinearGradient>
        </View>
      );
    });
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
  
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
      console.log("Table dropped");
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
      <ScrollView>
        <Drawer.Screen options={{
          title: "Työvuorot", 
          headerShown: true, 
          headerLeft: () => <DrawerToggleButton/>}} 
        />

        <Text style={styles.heroTextShift}>Tehdyt työvuorot</Text>

        <Text value={currentShift} />
        {showShifts()}

      </ScrollView>
    </View>
  );
}