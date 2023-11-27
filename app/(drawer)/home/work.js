import { Text, View } from 'react-native';
import { styles } from "c:/OpiskeluEOD/Massit/Styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useState, useEffect, useRef } from 'react';
import * as SQLite from 'expo-sqlite';
import { Link } from 'expo-router';

const Work = () => {
  const db = SQLite.openDatabase('shifts.db');
  const [shifts, setShifts] = useState([]);

  const [currentDate, setCurrentDate] = useState('');
  const [showDate, setShowDate] = useState(false)
  const today = new Date();

  const [startText, setStartText] = useState('Aloita vuoro');
  const [startColor, setStartColor] = useState(colors=['#75F8CC', '#45DCA9', '#13A674']);
  const [restText, setRestText] = useState('Aloita tauko');
  const [restColor, setRestColor] = useState(colors=['#77DEEF', '#46BACD', '#1696AB']);
  const [addColor, setAddColor] = useState(colors=['#77DEEF', '#46BACD', '#1696AB']);

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const [timeShift, setTimeShift] = useState(0);
  const [dateShift, setDateShift] = useState(0);

  const [restTime, setRestTime] = useState(0);
  const [restRunning, setRestRunning] = useState(false);
  const intervalRest = useRef(null);
  const restTimeRef = useRef(0);
  const [timeRest, setTimeRest] = useState(0);

  const handleStartText = () => {
    setStartText('Lopeta vuoro');
  };

  const handleRestText = () => {
    setRestText('Lopeta tauko');
  };
  
  const handleStartColor = () => {
    setStartColor(colors=['#F87575', '#DC4545', '#A61313'])
  }

  const handleRestColor = () => {
    setRestColor(colors=['#BE77EF', '#9546CD', '#6B16AB'])
  }

  const handleAddColor = () => {
    setAddColor(colors=['#BE77EF', '#9546CD', '#6B16AB'])
  }

  useEffect(() => {
    const date = today. getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const hours = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
  
    const formattedDate = `${date}.${month}.${year}\n klo ${hours}:${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    setCurrentDate(formattedDate);
    setShowDate(false);
    console.log("currentDate", { currentDate });
  }, []);

  const addShift = (dateShift, timeShift, timeRest) => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO shifts (date, time, rest) VALUES (?,?,?)', [dateShift, timeShift, timeRest],
        (txObj, resultSet) => {
          let existingShifts = [...shifts];
          existingShifts.push({id: resultSet.insertId, date: dateShift, time: timeShift, rest: timeRest});
          setShifts(existingShifts);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  function startShift() {
    const formattedTime = formatTime(time);
    //const timeRunning = formatTime(restTime);
    if(!running)
    {
      startTimeRef.current = Date.now() - time * 1000;
      intervalRef.current = setInterval(() => {
        setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
      setRunning(true);
      setStartText('Lopeta vuoro')
      setStartColor(colors=['#F87575', '#DC4545', '#A61313']);
    }
    else
    {
      clearInterval(intervalRef.current);
      setTimeShift(formattedTime);
      setDateShift(currentDate);
      //setTimeRunning(time);
      setRunning(false);
      setStartText('Aloita vuoro');
      setStartColor(colors=['#75F8CC', '#45DCA9', '#13A674']);
      addShift(currentDate, time);
    }
  }

  function pauseShift() {
    const formattedTime = formatTime(restTime);

    if(running)
    {
      restTimeRef.current = Date.now() - restTime * 1000;
      intervalRest.current = setInterval(() => {
        setRestTime(Math.floor((Date.now() - restTimeRef.current) / 1000));
      }, 1000);

      clearInterval(intervalRef.current);
      setRestRunning(true);
      setRunning(false);
      setRestText('Lopeta tauko');
      setRestColor(colors=['#BE77EF', '#9546CD', '#6B16AB']);
    }
    else
    {
      startTimeRef.current = Date.now() - time * 1000;
      intervalRef.current = setInterval(() => {
        setTime(Math.floor(
          (Date.now() - startTimeRef.current) / 1000));
      }, 1000);
      clearImmediate(intervalRest.current);
      setTimeRest(formattedTime);
      setRestTime(0);
      setRestRunning(false);
      setRunning(true);
      setRestText('Aloita tauko');
      setRestColor(colors=['#77DEEF', '#46BACD', '#1696AB']);
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
  
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  return (

    <View style={styles.container}>
      <Drawer.Screen options={{
        title: "Koti", 
        headerShown: true, 
        headerLeft: () => <DrawerToggleButton/>}} 
      />

      <View style={styles.hero}>
        <Text style={styles.heroText}>Massit</Text>
      </View>

      <View style={styles.buttons}>
        <LinearGradient
          colors={startColor}
          style={styles.buttonStart}>
            
            <TouchableOpacity
              style={styles.buttonStart}
              onPress={() => {
                setShowDate(true);
                handleStartText();
                handleStartColor();
                startShift();
              }}
            >
              <Text style={styles.buttonStartText}>{startText}</Text>
            </TouchableOpacity>

        </LinearGradient>
            {showDate && (
              <View>
                <Text>Työvuoro alkoi: {currentDate}</Text>
                <Text>Työvuoro kestänyt: {time}</Text>
                <Text>Työvuoro kesti: {timeShift} pvn {dateShift}</Text>
              </View>
            )}
      </View>
      <View style={styles.buttonContainer}>

        <LinearGradient
          colors={restColor}
          style={styles.buttonAdd}>
          <TouchableOpacity 
            style={styles.buttonAdd}
            onPress={() => {
              handleRestText();
              handleRestColor();
              pauseShift();
            }}
            >
            <Text style={styles.buttonAddText}>{restText}</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={addColor}
          style={styles.buttonAdd}>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => {
              handleAddColor();
            }}>
            <Text style={styles.buttonAddText}>HCT-</Text>
            <Text style={styles.buttonAddText}>lisä</Text>
          </TouchableOpacity>
        </LinearGradient>

      </View>

        {showDate && (
          <View>
            <Text>Tauko alkoi: {currentDate}</Text>
            <Text>Tauko kestänyt: {restTime}</Text>
            <Text>Tauko kesti: {timeRest}</Text>
          </View>
        )}
    </View>


    );
}

export default Work;

// 190 276 21
// #BE77EF #9546CD #6B16AB